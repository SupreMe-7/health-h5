<template>
    <div class="doctor-chat">
        <div class="chat">
            <NavBar :title="`${doctorName}`" />
            <div class="chat-content" id="chat-content">
                <van-pull-refresh
                    v-model="isLoading"
                    @refresh="onRefresh"
                    success-text="加载成功"
                    loading-text="加载中……"
                    loosing-text="释放即可加载"
                    :disabled="refreshDisabled"
                >
                    <div v-for="(itemc, index) in content" :key="index">
                        <div class="word" v-if="itemc.isPatientSend === 0">
                            <img class="avator" :src="doctorIcon" />
                            <div class="info">
                                <p class="time">
                                    {{ formatTime(itemc.createTime) }}
                                </p>
                                <div
                                    v-if="itemc.isPic !== 1"
                                    class="info-content"
                                >
                                    {{ itemc.text }}
                                </div>
                                <div v-else class="info-content">
                                    <img
                                        class="chat-content-img"
                                        v-lazy="itemc.pic"
                                        preload="200"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="word-my" v-else>
                            <div class="info">
                                <p class="time">
                                    {{ formatTime(itemc.createTime) }}
                                </p>
                                <div
                                    v-if="itemc.isPic !== 1"
                                    class="info-content"
                                >
                                    {{ itemc.text }}
                                </div>
                                <div v-else class="info-content">
                                    <img
                                        class="chat-content-img"
                                        v-lazy="itemc.pic"
                                        preload="200"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <img class="avator" :src="profileIcon" />
                        </div>
                    </div>
                </van-pull-refresh>
            </div>
            <div class="chat-input">
                <div class="chat-shuru">
                    <van-field v-model="text" placeholder="" />
                </div>
                <div class="chat-button">
                    <van-button
                        type="info"
                        round
                        @click="send(false)"
                        :disabled="disabled"
                        >发送</van-button
                    >
                </div>
                <div class="chat-img">
                    <van-uploader :after-read="afterRead" :disabled="disabled">
                        <van-icon name="add-o" size="28" />
                    </van-uploader>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import {
    Button,
    Toast,
    Field,
    CellGroup,
    Icon,
    PullRefresh,
    Uploader,
} from 'vant';
import { getPId } from '@/common/util.js';
var moment = require('moment');
var COS = require('cos-js-sdk-v5');

export default {
    data() {
        return {
            doctorName: '',
            pId: null,
            dId: null,
            text: '',
            currPage: 1,
            totalNum: null,
            totalPage: null,
            content: [],
            isLoading: false,
            config: {
                Bucket: 'qkys-1255565436' /* 必须 */,
                Region: 'ap-shanghai' /* 存储桶所在地域，必须字段 */,
            },
            cos: null,
            disabled: false,
            profileIcon: '',
            doctorIcon: '',
            refreshDisabled: false,
        };
    },
    components: {
        NavBar,
        [Button.name]: Button,
        [Field.name]: Field,
        [CellGroup.name]: CellGroup,
        [Icon.name]: Icon,
        [PullRefresh.name]: PullRefresh,
        [Uploader.name]: Uploader,
    },
    async mounted() {
        this.pId = getPId();
        this.dId = this.$route.query.dId;
        this.doctorName = this.$route.query.doctorName;
        await this.getContent();
        setTimeout(() => {
            var ele = document.getElementById('chat-content');
            const scrollTop = ele.scrollHeight;
            ele.scrollTop = scrollTop;
        }, 500);
        var _this = this;
        this.cos = new COS({
            getAuthorization: function(options, callback) {
                _this.$api.get('/qkys/api/getPatientChatCosSts').then(res => {
                    var credentials = res.data.response.credentials;
                    callback({
                        TmpSecretId: credentials.tmpSecretId,
                        TmpSecretKey: credentials.tmpSecretKey,
                        SecurityToken: credentials.sessionToken,
                        // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
                        StartTime: res.data.response.startTime, // 时间戳，单位秒，如：1580000000
                        ExpiredTime: res.data.response.expiredTime, // 时间戳，单位秒，如：1580000000
                    });
                });
            },
        });
    },
    methods: {
        afterRead(file) {
            this.disabled = true;
            let _this = this;
            let filePath = `${this.pId}${moment().format('x')}`;
            try {
                this.cos.putObject(
                    {
                        ...this.config,
                        Key: `chat/${filePath}` /* 必须 */,
                        Body: file.file, // 上传文件对象
                        onProgress: function(progressData) {
                            console.log(JSON.stringify(progressData));
                        },
                    },
                    function(err, data) {
                        console.log(err || data);
                        if (err) {
                            Toast('发送失败');
                        } else {
                            _this.send(true, filePath, data.Location);
                        }
                    }
                );
            } catch {
                this.disabled = false;
            }
        },
        //TODO: 自动定位未做，头像未做，添加消息到最后一条，
        async onRefresh() {
            let ele = document.getElementById('chat-content');

            let lastScrollHeight = document.getElementById('chat-content')
                .scrollHeight;

            ++this.currPage;
            if (this.currPage > this.totalPage) {
                this.refreshDisabled = true;
            }
            await this.getContent();
            this.isLoading = false;

            setTimeout(() => {
                const scrollTop = ele.scrollHeight - lastScrollHeight;
                ele.scrollTop = scrollTop - 200;
            }, 500);
        },
        formatTime(time = '') {
            if (moment().format('YYYY-MM-DD') === time.slice(0, 10)) {
                return time.slice(10);
            }
            return time;
        },
        send(isPic, data, fullPath) {
            if (isPic) {
                this.$api
                    .post(`/qkys/api/addPatientDoctorChat`, {
                        pId: this.pId,
                        dId: this.dId,
                        pic: data,
                        // 0是医生发送的， 1是患者发送的
                        isPatientSend: 1,
                        // 1是图像
                        isPic: 1,
                    })
                    .then(() => {
                        this.content.push({
                            createTime: moment().format('HH:mm:ss'),
                            dId: this.dId,
                            isPatientSend: 1,
                            isPic: 1,
                            isRead: 1,
                            pId: this.pId,
                            pic: 'https://' + fullPath,
                        });
                    })
                    .catch(e => {
                        Toast(e.errMsg);
                    })
                    .finally(() => {
                        this.disabled = false;
                    });
            } else {
                this.disabled = true;
                this.$api
                    .post(`/qkys/api/addPatientDoctorChat`, {
                        pId: this.pId,
                        dId: this.dId,
                        text: this.text,
                        // 0是医生发送的， 1是患者发送的
                        isPatientSend: 1,
                        // 1是图像
                        isPic: 0,
                    })
                    .then(() => {
                        this.content.push({
                            createTime: moment().format('HH:mm:ss'),
                            dId: this.dId,
                            isPatientSend: 1,
                            isPic: 0,
                            isRead: 1,
                            pId: this.pId,
                            text: this.text,
                        });
                        this.text = '';
                        this.disabled = false;
                    })
                    .catch(e => {
                        Toast(e.errMsg);
                    })
                    .finally(() => {
                        this.disabled = false;
                    });
            }
        },
        getContent() {
            this.$api
                .post(`/qkys/api/getPatientDoctorChat`, {
                    pId: this.pId,
                    dId: this.dId,
                    currPage: this.currPage,
                    pageSize: 20,
                })
                .then(res => {
                    this.currPage = res.data.currPage;
                    this.totalPage = res.data.totalPage;
                    this.profileIcon = res.data.profileIcon;
                    this.doctorIcon = res.data.doctorIcon;
                    const temp = res.data.data;
                    temp.forEach(item => {
                        this.content.unshift(item);
                    });
                    // this.content = [...temp, ...this.content];
                })
                .catch(e => {
                    if (this.currPage === 1) {
                        this.currPage = 1;
                    } else {
                        --this.currPage;
                    }
                    Toast(e.errMsg);
                });
        },
    },
};
</script>

<style lang="less" scoped>
.doctor-chat {
    height: 100%;
    background-color: #f8f8f8;
    .chat {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .chat-content {
        flex-grow: 1;
        overflow: scroll;
        padding: 46px 20px 0 20px;
        .word {
            display: flex;
            margin-bottom: 20px;
            :last-child {
                margin-bottom: 0;
            }
            .avator {
                flex-shrink: 0;
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
            .info {
                margin-left: 10px;
                .time {
                    font-size: 12px;
                    color: rgba(51, 51, 51, 0.8);
                    margin: 0;
                    height: 20px;
                    line-height: 20px;
                    margin-top: -5px;
                }
                .info-content {
                    display: inline-block;
                    padding: 10px;
                    font-size: 14px;
                    background: #fff;
                    position: relative;
                    margin-top: 8px;
                }
                //小三角形
                .info-content::before {
                    position: absolute;
                    left: -8px;
                    top: 8px;
                    content: '';
                    border-right: 10px solid #fff;
                    border-top: 8px solid transparent;
                    border-bottom: 8px solid transparent;
                }
            }
            .chat-content-img {
                width: 100%;
                height: 200px;
                object-fit: contain;
            }
        }

        .word-my {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 20px;
            .avator {
                flex-shrink: 0;
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
            .info {
                width: 90%;
                margin-left: 10px;
                text-align: right;
                .time {
                    font-size: 12px;
                    color: rgba(51, 51, 51, 0.8);
                    margin: 0;
                    height: 20px;
                    line-height: 20px;
                    margin-top: -5px;
                    margin-right: 10px;
                }
                .info-content {
                    padding: 10px;
                    font-size: 14px;
                    float: right;
                    margin-right: 10px;
                    position: relative;
                    margin-top: 8px;
                    background: #a3c3f6;
                    text-align: left;
                }
                //小三角形
                .info-content::after {
                    position: absolute;
                    right: -8px;
                    top: 8px;
                    content: '';
                    border-left: 10px solid #a3c3f6;
                    border-top: 8px solid transparent;
                    border-bottom: 8px solid transparent;
                }
            }
            .chat-content-img {
                object-fit: contain;
                width: 100%;
                height: 200px;
            }
        }
    }
    .chat-input {
        background: #ededed;
        display: flex;
        align-items: center;
        padding: 10px;
        .chat-shuru {
            flex-grow: 1;
        }
        .chat-button {
            margin: 0 10px;
        }
    }
}
</style>
