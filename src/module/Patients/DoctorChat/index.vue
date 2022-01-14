<template>
    <div class="doctor-chat">
        <div class="chat">
            <NavBar :title="`${doctorName}`" />
            <div class="chat-content">
                <van-pull-refresh
                    v-model="isLoading"
                    @refresh="onRefresh"
                    success-text="加载成功"
                    loading-text="加载中……"
                    loosing-text="释放即可加载"
                >
                    <div v-for="(itemc, index) in content" :key="index">
                        <div class="word" v-if="itemc.isPatientSend === 0">
                            <img class="avator" :src="itemc.headUrl" />
                            <div class="info">
                                <p class="time">
                                    {{ doctorName }}
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
                                        src="https://upfile2.asqql.com/upfile/hdimg/wmtp/wmtp/2015-12/30/9835VicmIhquvD.jpg"
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
                                    v-if="itemc.isPic === 1"
                                    class="info-content"
                                >
                                    {{ itemc.text }}
                                </div>
                                <div v-else class="info-content">
                                    <img
                                        class="chat-content-img"
                                        src="https://upfile2.asqql.com/upfile/hdimg/wmtp/wmtp/2015-12/30/9835VicmIhquvD.jpg"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <img class="avator" :src="itemc.headUrl" />
                        </div>
                    </div>
                </van-pull-refresh>
            </div>
            <div class="chat-input">
                <div class="chat-shuru">
                    <van-field v-model="text" placeholder="" />
                </div>
                <div class="chat-button">
                    <van-button type="info" round @click="send"
                        >发送</van-button
                    >
                </div>
                <div class="chat-img">
                    <van-icon name="add-o" size="28" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

import { Button, Toast, Field, CellGroup, Icon, PullRefresh } from 'vant';
import { getPId } from '@/common/util.js';

export default {
    data() {
        return {
            doctorName: 'xx医生',
            pId: null,
            dId: null,
            text: '',
            pic: '',
            currPage: 1,
            content: [],
            isLoading: false,
        };
    },
    components: {
        NavBar,
        [Button.name]: Button,
        [Field.name]: Field,
        [CellGroup.name]: CellGroup,
        [Icon.name]: Icon,
        [PullRefresh.name]: PullRefresh,
    },
    mounted() {
        this.pId = getPId();
        this.dId = this.$route.query.dId;
        this.getContent();
    },
    methods: {
        async onRefresh() {
            ++this.currPage;
            await this.getContent();
            this.isLoading = false;
        },
        formatTime(time = '') {
            if (new Date().toJSON().slice(0, 10) === time.slice(0, 10)) {
                return time.slice(10);
            }
            return time;
        },
        send() {
            this.$api
                .post(`/qkys/api/addPatientDoctorChat`, {
                    pId: this.pId,
                    dId: this.dId,
                    text: this.text,
                    pic: '',
                    // 0是医生发送的， 1是患者发送的
                    isPatientSend: 0,
                    // 1是图像
                    isPic: 0,
                })
                .then(res => {
                    console.log(res);
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
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
                    const temp = res.data.reverse();
                    this.content = [...temp, ...this.content];
                    console.log(this.content);
                })
                .catch(e => {
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
                    max-width: 70%;
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
                width: 100%;
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
