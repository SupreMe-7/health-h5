<template>
    <div class="personal-cases">
        <NavBar title="添加医生建议" />
        <van-field
            v-model="advice"
            rows="8"
            autosize
            label="医生建议"
            type="textarea"
            maxlength="200"
            placeholder="请输入医生建议"
            show-word-limit
        />
        <div class="img-upload">
            <van-uploader v-model="fileList" accept="image/*" max-count="3" />
        </div>
        <div class="btn-group">
            <van-button type="info" @click="submit" round>提交</van-button>
        </div>
    </div>
</template>

<script>
// 个人病例
import { Button, Field, CellGroup, Toast, Uploader } from 'vant';
import NavBar from '@/components/NavBar.vue';
var COS = require('cos-js-sdk-v5');
var moment = require('moment');
export default {
    data() {
        return {
            pId: null,
            sId: null,
            advice: '',
            loading: false,
            fileList: [],
            config: {
                Bucket: 'qkys-1255565436' /* 必须 */,
                Region: 'ap-shanghai' /* 存储桶所在地域，必须字段 */,
            },
            cos: null,
        };
    },
    computed: {},
    mounted() {
        this.sId = sessionStorage.getItem('SID');
        this.pId = this.$route.query.pId;
        var _this = this;
        this.cos = new COS({
            getAuthorization: function(options, callback) {
                _this.$api.get('/qkys/api/sup/getAdviceCosSts').then(res => {
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
    components: {
        [Button.name]: Button,
        [Field.name]: Field,
        [CellGroup.name]: CellGroup,
        [Uploader.name]: Uploader,
        NavBar,
    },
    methods: {
        submit() {
            let pics = [];
            this.loading = true;
            if (this.fileList.length) {
                let files = [];
                let _this = this;
                this.fileList.forEach((item, index) => {
                    let filePath = `${this.pId}${moment().format(
                        'x'
                    )}-${index}`;
                    files.push({
                        ...this.config,
                        Key: `advice/${filePath}` /* 必须 */,
                        Body: item.file,
                        onTaskReady: function(taskId) {
                            console.log(taskId);
                        },
                    });
                    pics.push(filePath);
                });
                this.cos.uploadFiles(
                    {
                        files: files,
                        SliceSize: 1024 * 1024 * 100,
                        onProgress: function(info) {
                            var percent = parseInt(info.percent * 10000) / 100;
                            var speed =
                                parseInt((info.speed / 1024 / 1024) * 100) /
                                100;
                            console.log(
                                '进度：' +
                                    percent +
                                    '%; 速度：' +
                                    speed +
                                    'Mb/s;'
                            );
                        },
                        onFileFinish: function(err, data, options) {
                            console.log(
                                options.Key + '上传' + (err ? '失败' : '完成')
                            );
                        },
                    },
                    function(err, data) {
                        if (data.files.length === _this.fileList.length) {
                            _this.$api
                                .post('/qkys/api/sup/addDoctorAdvice', {
                                    pId: _this.pId,
                                    doctorId: _this.sId,
                                    role: 'Sup',
                                    hasPic: !!_this.fileList.length,
                                    advice: _this.advice,
                                    pics: pics,
                                })
                                .then(() => {
                                    Toast('添加成功');
                                    _this.$router.back();
                                })
                                .catch(e => {
                                    Toast(e.errMsg);
                                })
                                .finally(() => {
                                    _this.loading = false;
                                });
                        }
                    }
                );
            } else {
                this.$api
                    .post(`/qkys/api/sup/addDoctorAdvice`, {
                        pId: this.pId,
                        doctorId: this.sId,
                        role: 'Sup',
                        hasPic: !!this.fileList.length,
                        advice: this.advice,
                    })
                    .then(() => {
                        Toast('添加成功');
                        this.$router.back();
                    })
                    .catch(e => {
                        Toast(e.errMsg);
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }
        },
    },
};
</script>

<style lang="less" scoped>
.personal-cases {
    .btn-group {
        margin: 10px;
        text-align: right;
    }
}
</style>
