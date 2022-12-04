<template>
    <div class="add">
        <NavBar title="添加推荐阅读" />
        <van-cell-group>
            <van-field
                size="large"
                v-model="title"
                label="标题"
                placeholder="请输入内容"
            />
            <van-field
                size="large"
                v-model="introduction"
                label="介绍"
                placeholder="请输入内容"
            />
            <van-field
                size="large"
                v-model="url"
                label="网址"
                placeholder="请输入内容"
            />
            <van-field
                size="large"
                v-model="website"
                label="引用网站"
                placeholder="请输入内容"
            />
            <van-field
                readonly
                clickable
                size="large"
                label="阅读用户"
                :value="roleText"
                placeholder="请选择阅读用户"
                @click="showPicker = true"
            />
            <van-popup v-model="showPicker" round position="bottom">
                <van-picker
                    show-toolbar
                    :columns="columns"
                    @cancel="showPicker = false"
                    @confirm="onConfirm"
                />
            </van-popup>
            <div class="img-upload">
                <van-uploader
                    v-model="fileList"
                    accept="image/*"
                    max-count="2"
                />
            </div>
        </van-cell-group>
        <div class="btn-group">
            <van-button type="info" @click="addRecommend">提交</van-button>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { Field, Toast, Picker, Popup, CellGroup, Uploader, Button } from 'vant';
var COS = require('cos-js-sdk-v5');
var moment = require('moment');
export default {
    data() {
        return {
            showPicker: false,
            adminId: null,
            title: '',
            introduction: '',
            url: '',
            website: '',
            isHasPic: '',
            pics: '',
            role: '',
            roleText: '',
            columns: [
                {
                    text: '患者',
                    value: 'Pa',
                },
                {
                    text: '医生',
                    value: 'Doc',
                },
                {
                    text: '所有人',
                    value: 'All',
                },
            ],
            fileList: [],
            config: {
                Bucket: 'qkys-1255565436' /* 必须 */,
                Region: 'ap-shanghai' /* 存储桶所在地域，必须字段 */,
            },
            cos: null,
        };
    },
    mounted() {
        this.adminId = sessionStorage.getItem('adminId');
        var _this = this;
        this.cos = new COS({
            getAuthorization: function(options, callback) {
                _this.$api
                    .get('/qkys/api/admin/getRecommandReadCosSts')
                    .then(res => {
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
        NavBar,
        [Field.name]: Field,
        [Picker.name]: Picker,
        [Popup.name]: Popup,
        [CellGroup.name]: CellGroup,
        [Uploader.name]: Uploader,
        [Button.name]: Button,
    },
    methods: {
        addRecommend() {
            if (!this.fileList.length) {
                Toast('请上传1-2张图片');
            }
            let pics = [];
            let files = [];
            let _this = this;
            this.fileList.forEach((item, index) => {
                let filePath = `${moment().format('x')}-${index}`;
                files.push({
                    ...this.config,
                    Key: `RecommandRead/${filePath}` /* 必须 */,
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
                            parseInt((info.speed / 1024 / 1024) * 100) / 100;
                        console.log(
                            '进度：' + percent + '%; 速度：' + speed + 'Mb/s;'
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
                            .post(`/qkys/api/admin/addRecommandRead`, {
                                adminId: _this.adminId,
                                title: _this.title,
                                introduction: _this.introduction,
                                url: _this.url,
                                website: _this.website,
                                isHasPic: !!_this.fileList.length,
                                role: _this.role,
                                pics: pics,
                            })
                            .then(() => {
                                _this.$router.back();
                            })
                            .catch(e => {
                                Toast(e.errMsg);
                            });
                    }
                }
            );
        },
        onConfirm(value) {
            this.roleText = value.text;
            this.role = value.value;
            this.showPicker = false;
        },
    },
};
</script>

<style lang="less" scoped>
.btn-group {
    text-align: right;
    padding: 20px;
}
</style>
