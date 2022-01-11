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
            <van-field
                v-model="blood_sugar.beforeBreakfastSugar"
                type="number"
                label="早餐前"
                placeholder="请输入内容"
            />
            <van-field
                v-model="blood_sugar.afterBreakfastSugar"
                type="number"
                label="早餐后"
                placeholder="请输入内容"
            />
            <van-field
                v-model="blood_sugar.beforeLunchSugar"
                type="number"
                label="午餐前"
                placeholder="请输入内容"
            />
            <van-field
                v-model="blood_sugar.afterLunchSugar"
                type="number"
                label="午餐后"
                placeholder="请输入内容"
            />
            <van-field
                v-model="blood_sugar.beforeDinnerSugar"
                type="number"
                label="晚餐前"
                placeholder="请输入内容"
            />
            <van-field
                v-model="blood_sugar.afterDinnerSugar"
                type="number"
                label="晚餐后"
                placeholder="请输入内容"
            />
            <van-field
                v-model="blood_sugar.beforeSleepSugar"
                type="number"
                label="睡前"
                placeholder="请输入内容"
            />
        </div>
        <div
            v-else-if="diaryMethod.value === 'blood_pressure'"
            class="calendar-type"
        >
            <van-field
                v-model="blood_pressure.morningHighPressure"
                type="number"
                label="早晨高压"
                placeholder="请输入内容"
            />
            <van-field
                v-model="blood_pressure.morningLowPressure"
                type="number"
                label="早晨低压"
                placeholder="请输入内容"
            />
            <van-field
                v-model="blood_pressure.afternoonHighPressure"
                type="number"
                label="中午高压"
                placeholder="请输入内容"
            />
            <van-field
                v-model="blood_pressure.afternoonLowPressure"
                type="number"
                label="中午低压"
                placeholder="请输入内容"
            />
            <van-field
                v-model="blood_pressure.eveningHighPressure"
                type="number"
                label="晚间高压"
                placeholder="请输入内容"
            />
            <van-field
                v-model="blood_pressure.eveningLowPressure"
                type="number"
                label="晚间低压"
                placeholder="请输入内容"
            />
        </div>
        <div
            v-else-if="diaryMethod.value === 'sport_diet'"
            class="calendar-type"
        >
            <div>运动</div>
            <van-field
                v-model="sport_diet.morningSport"
                label="早晨"
                placeholder="请输入内容"
            />
            <van-field
                v-model="sport_diet.afternoonSport"
                label="中午"
                placeholder="请输入内容"
            />
            <van-field
                v-model="sport_diet.eveningSport"
                label="晚间"
                placeholder="请输入内容"
            />
            <div>饮食</div>
            <van-field
                v-model="sport_diet.breakfast"
                label="早餐"
                placeholder="请输入内容"
            />
            <van-field
                v-model="sport_diet.lunch"
                label="午餐"
                placeholder="请输入内容"
            />
            <van-field
                v-model="sport_diet.dinner"
                label="晚餐"
                placeholder="请输入内容"
            />
            <van-field
                v-model="sport_diet.betweenMeals"
                label="间食"
                placeholder="请输入内容"
            />
        </div>
        <div
            v-else-if="diaryMethod.value === 'examination'"
            class="calendar-type"
        >
            <van-radio-group v-model="examinationRadio">
                <van-radio name="血液生化类">血液生化类</van-radio>
                <van-radio name="肝肾检验类">肝肾检验类</van-radio>
                <van-radio name="影像类">影像类</van-radio>
                <van-radio name="彩超">彩超</van-radio>
                <van-radio name="其他">其他</van-radio>
            </van-radio-group>
            <van-field
                v-if="examinationRadio === '其他'"
                v-model="examination.examType"
                label="辅助操作"
                placeholder="请输入操作类型"
            />
        </div>
        <div v-if="diaryMethod.value">
            <van-uploader v-model="fileList" accept="image/*" max-count="3" />
        </div>
        <div v-if="diaryMethod.value" class="btn-group">
            <van-button
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
// TODO:
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
} from 'vant';
import NavBar from '@/components/NavBar.vue';
import { getPid } from '@/common/util.js';

export default {
    data() {
        return {
            pId: '',
            value: '',
            loading: false,
            choseTypePicker: false,
            diaryMethod: {},
            diaryMethodList: [
                { text: '血糖', value: 'blood_sugar' },
                { text: '血压', value: 'blood_pressure' },
                { text: '运动/饮食', value: 'sport_diet' },
                { text: '辅助检查', value: 'examination' },
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
            },
            // 血压
            blood_pressure: {
                morningHighPressure: '',
                morningLowPressure: '',
                afternoonHighPressure: '',
                afternoonLowPressure: '',
                eveningHighPressure: '',
                eveningLowPressure: '',
            },
            // 运动/饮食
            sport_diet: {
                betweenMeals: '',
                morningSport: '',
                afternoonSport: '',
                eveningSport: '',
                lunch: '',
                breakfast: '',
                dinner: '',
            },
            // 辅助操作
            examination: {
                examType: '',
            },
            examinationRadio: '',
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
            };
            // 血压
            this.blood_pressure = {
                morningHighPressure: '',
                morningLowPressure: '',
                afternoonHighPressure: '',
                afternoonLowPressure: '',
                eveningHighPressure: '',
                eveningLowPressure: '',
            };
            // 运动/饮食
            this.sport_diet = {
                betweenMeals: '',
                morningSport: '',
                afternoonSport: '',
                eveningSport: '',
                lunch: '',
                breakfast: '',
                dinner: '',
            };
            // 辅助操作
            this.examination = {
                examType: '',
            };
            this.examinationRadio = '';
        },
        examinationRadio(newVal) {
            if (newVal !== '其他') {
                this.examination.examType = newVal;
                return;
            }
            this.examination.examType = '';
        },
    },
    computed: {},
    mounted() {
        this.pId = getPid();
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
        NavBar,
    },
    methods: {
        confirmType(value) {
            this.diaryMethod = value;
            this.choseTypePicker = false;
        },
        // 循环处理图片压缩
        async lrz() {
            let pics = [];
            try {
                for (let item of this.fileList) {
                    let res = await this.$lrz(item.file);
                    this.value = res;
                    pics.push(res.base64.split(',')[1]);
                }
            } catch {
                Toast('压缩图片失败');
            }
            return pics;
        },
        async uploadCalendar() {
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
            if (
                this.diaryMethod.value === 'examination' &&
                !this.fileList.length
            ) {
                Toast('请上传图片');
                return;
            }
            this.loading = true;
            let pics = await this.lrz();
            this.$api
                .post('/qkys/api/addDiary', {
                    pId: this.pId,
                    data: this[this.diaryMethod.value],
                    hasPic: !!this.fileList.length,
                    pics: pics,
                    diaryMethod: this.diaryMethod.value,
                })
                .then(res => {
                    Toast('上传成功');
                    this.diaryMethod = {};
                })
                .catch(e => {
                    Toast(e.errMsg);
                })
                .finally(() => {
                    this.loading = false;
                });
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
