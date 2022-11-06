<template>
    <div class="add-calendar">
        <NavBar />
        <div class="chose-upload-type">
            <van-field
                readonly
                clickable
                label="上传类型"
                :value="diaryMethod.text"
                placeholder="请选择上传的类型"
                @click="choseTypePicker = true"
            />
            <van-popup v-model="choseTypePicker" round position="bottom">
                <van-picker
                    show-toolbar
                    :columns="diaryMethodList"
                    @cancel="choseTypePicker = false"
                    @confirm="confirmType"
                />
            </van-popup>
        </div>
        <div v-if="diaryMethod.value === 'blood_sugar'" class="calendar-type">
            早餐前：
            <van-field
                v-model="blood_sugar.beforeBreakfastSugar"
                type="number"
                placeholder="请输入血糖情况"
            />
            <van-field
                v-model="blood_sugar.beforeBreakfastDiet"
                type="string"
                placeholder="请输入饮食及运动情况"
            />
            早餐后：
            <van-field
                v-model="blood_sugar.afterBreakfastSugar"
                type="number"
                placeholder="请输入血糖情况"
            />
            <van-field
                v-model="blood_sugar.afterBreakfastDiet"
                type="string"
                placeholder="请输入饮食及运动情况"
            />
            午餐前：
            <van-field
                v-model="blood_sugar.beforeLunchSugar"
                type="number"
                placeholder="请输入血糖情况"
            />
            <van-field
                v-model="blood_sugar.beforeLunchDiet"
                type="string"
                placeholder="请输入饮食及运动情况"
            />
            午餐后：
            <van-field
                v-model="blood_sugar.afterLunchSugar"
                type="number"
                placeholder="请输入血糖情况"
            />
            <van-field
                v-model="blood_sugar.afterLunchDiet"
                type="string"
                placeholder="请输入饮食及运动情况"
            />
            晚餐前：
            <van-field
                v-model="blood_sugar.beforeDinnerSugar"
                type="number"
                placeholder="请输入血糖情况"
            />
            <van-field
                v-model="blood_sugar.beforeDinnerDiet"
                type="string"
                placeholder="请输入饮食及运动情况"
            />
            晚餐后：
            <van-field
                v-model="blood_sugar.afterDinnerSugar"
                type="number"
                placeholder="请输入血糖情况"
            />
            <van-field
                v-model="blood_sugar.afterDinnerDiet"
                type="string"
                placeholder="请输入饮食及运动情况"
            />
            睡前：
            <van-field
                v-model="blood_sugar.beforeSleepSugar"
                type="number"
                placeholder="请输入血糖情况"
            />
            <van-field
                v-model="blood_sugar.beforeSleepDiet"
                type="string"
                placeholder="请输入饮食及运动情况"
            />
            随机血糖：
            <van-field
                v-model="blood_sugar.randomSugar"
                type="number"
                placeholder="请输入血糖情况"
            />
        </div>
        <div
            v-else-if="diaryMethod.value === 'blood_pressure'"
            class="calendar-type"
        >
            <van-field
                v-model="blood_pressure.measureTime"
                type="string"
                label="测量时间"
                placeholder="请选择测量时间"
                @click="choseBloodTimePicker = true"
            />
            <van-popup v-model="choseBloodTimePicker" round position="bottom">
                <van-datetime-picker
                    type="time"
                    title="选择时间"
                    :min-hour="0"
                    :max-hour="23"
                    @cancel="choseBloodTimePicker = false"
                    @confirm="bloodTimeConfirm"
                />
            </van-popup>

            <van-field
                v-model="blood_pressure.highPressure"
                type="number"
                label="高压"
                placeholder="请输入高压"
            />
            <van-field
                v-model="blood_pressure.lowPressure"
                type="number"
                label="低压"
                placeholder="请输入低压"
            />
        </div>
        <div
            v-else-if="diaryMethod.value === 'examination'"
            class="calendar-type"
        >
            <van-field
                readonly
                clickable
                label="检验类型"
                :value="examination.examType"
                placeholder="请选择检验类型"
                @click="choseExaminationPicker = true"
            />
            <van-popup v-model="choseExaminationPicker" round position="bottom">
                <van-picker
                    show-toolbar
                    :columns="examinationList"
                    @cancel="choseExaminationPicker = false"
                    @confirm="confirmExaminationType"
                />
            </van-popup>
            <van-field
                v-model="examination.examValue"
                type="string"
                placeholder="请输入内容"
            />
        </div>
        <div v-if="diaryMethod.value">
            <van-uploader v-model="fileList" accept="image/*" max-count="3" />
        </div>
        <div v-if="diaryMethod.value" class="btn-group">
            <van-button
                round
                type="info"
                @click="uploadCalendar"
                :loading="loading"
                loading-text="上传中..."
                >上传</van-button
            >
        </div>
        <img :src="value" alt="" />
    </div>
</template>

<script>
import {
    Button,
    Cell,
    CellGroup,
    Picker,
    Field,
    Popup,
    Uploader,
    RadioGroup,
    Radio,
    Toast,
    DatetimePicker,
} from 'vant';
import NavBar from '@/components/NavBar.vue';
import { getPId } from '@/common/util.js';
var COS = require('cos-js-sdk-v5');
var moment = require('moment');

export default {
    data() {
        return {
            pId: '',
            value: '',
            loading: false,
            choseTypePicker: false,
            choseBloodTimePicker: false,
            choseExaminationPicker: false,
            diaryMethod: {},
            config: {
                Bucket: 'qkys-1255565436' /* 必须 */,
                Region: 'ap-shanghai' /* 存储桶所在地域，必须字段 */,
            },
            examinationList: [
                {
                    text: '血液化验类',
                    value: '血液化验类',
                },
                {
                    text: '影像类',
                    value: '影像类',
                },
                {
                    text: '其他',
                    value: '其他',
                },
            ],
            diaryMethodList: [
                { text: '血糖', value: 'blood_sugar' },
                { text: '血压', value: 'blood_pressure' },
                { text: '其他', value: 'examination' },
            ],
            fileList: [],
            pics: [],
            // 血糖
            blood_sugar: {
                afterBreakfastSugar: '',
                afterDinnerSugar: '',
                afterLunchSugar: '',
                beforeBreakfastSugar: '',
                beforeDinnerSugar: '',
                beforeLunchSugar: '',
                beforeSleepSugar: '',
                afterBreakfastDiet: '',
                afterDinnerDiet: '',
                afterLunchDiet: '',
                beforeBreakfastDiet: '',
                beforeDinnerDiet: '',
                beforeLunchDiet: '',
                beforeSleepDiet: '',
                randomSugar: '',
                randomDiet: '',
            },
            // 血压
            blood_pressure: {
                measureTime: '',
                highPressure: '',
                lowPressure: '',
            },
            // 辅助操作
            examination: {
                examType: '',
                examValue: '',
            },
        };
    },
    watch: {
        diaryMethod() {
            this.fileList = [];
            this.blood_sugar = {
                afterBreakfastSugar: '',
                afterDinnerSugar: '',
                afterLunchSugar: '',
                beforeBreakfastSugar: '',
                beforeDinnerSugar: '',
                beforeLunchSugar: '',
                beforeSleepSugar: '',
                afterBreakfastDiet: '',
                afterDinnerDiet: '',
                afterLunchDiet: '',
                beforeBreakfastDiet: '',
                beforeDinnerDiet: '',
                beforeLunchDiet: '',
                beforeSleepDiet: '',
                randomSugar: '',
                randomDiet: '',
            };
            // 血压
            this.blood_pressure = {
                measureTime: '',
                highPressure: '',
                lowPressure: '',
            };
            // 辅助操作
            this.examination = {
                examType: '',
                examValue: '',
            };
        },
    },
    computed: {},
    mounted() {
        var _this = this;
        this.pId = getPId();
        this.cos = new COS({
            getAuthorization: function(options, callback) {
                _this.$api.get('/qkys/api/getPatientDiaryCosSts').then(res => {
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
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Picker.name]: Picker,
        [Field.name]: Field,
        [Popup.name]: Popup,
        [Uploader.name]: Uploader,
        [RadioGroup.name]: RadioGroup,
        [Radio.name]: Radio,
        [DatetimePicker.name]: DatetimePicker,
        NavBar,
    },
    methods: {
        bloodTimeConfirm(value) {
            this.blood_pressure.measureTime = value;
            this.choseBloodTimePicker = false;
        },
        confirmType(value) {
            this.diaryMethod = value;
            this.choseTypePicker = false;
        },
        confirmExaminationType(value) {
            this.examination.examType = value.value;
            this.choseExaminationPicker = false;
        },
        async uploadCalendar() {
            let pics = [];
            let isNull = true;
            if (!this.fileList.length) {
                for (let i in this[this.diaryMethod.value]) {
                    if (this[this.diaryMethod.value][i]) {
                        isNull = false;
                    }
                }
            } else {
                isNull = false;
            }
            if (isNull) {
                Toast('不能上传空日历');
                return;
            }
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
                        Key: `diary/${filePath}` /* 必须 */,
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
                                .post('/qkys/api/addDiary', {
                                    pId: _this.pId,
                                    data: _this[_this.diaryMethod.value],
                                    hasPic: !!_this.fileList.length,
                                    pics: pics,
                                    diaryMethod: _this.diaryMethod.value,
                                })
                                .then(() => {
                                    Toast('上传成功');
                                    _this.diaryMethod = {};
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
                    .post('/qkys/api/addDiary', {
                        pId: this.pId,
                        data: this[this.diaryMethod.value],
                        hasPic: !!this.fileList.length,
                        pics: pics,
                        diaryMethod: this.diaryMethod.value,
                    })
                    .then(() => {
                        Toast('上传成功');
                        this.diaryMethod = {};
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
.add-calendar {
    .calendar-type {
        padding: 0 15px;
        margin: 10px 0 20px 0;
        .van-radio {
            margin: 8px 0;
        }
    }
    .btn-group {
        margin: 20px 15px 0 0;
        text-align: right;
    }
}
</style>
