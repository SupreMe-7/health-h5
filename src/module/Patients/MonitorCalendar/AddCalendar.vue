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
                placeholder="请输入血糖值"
            />
            <van-field
                v-model="blood_sugar.afterBreakfastSugar"
                type="number"
                label="早餐后"
                placeholder="请输入血糖值"
            />
            <van-field
                v-model="blood_sugar.beforeLunchSugar"
                type="number"
                label="午餐前"
                placeholder="请输入血糖值"
            />
            <van-field
                v-model="blood_sugar.afterLunchSugar"
                type="number"
                label="午餐后"
                placeholder="请输入血糖值"
            />
            <van-field
                v-model="blood_sugar.beforeDinnerSugar"
                type="number"
                label="晚餐前"
                placeholder="请输入血糖值"
            />
            <van-field
                v-model="blood_sugar.afterDinnerSugar"
                type="number"
                label="晚餐后"
                placeholder="请输入血糖值"
            />
            <van-field
                v-model="blood_sugar.beforeSleepSugar"
                type="number"
                label="睡前"
                placeholder="请输入血糖值"
            />
        </div>
        <div
            v-else-if="diaryMethod.value === 'blood_pressure'"
            class="calendar-type"
        >
            <van-field
                v-model="blood_pressure.morningPressure"
                label="早晨"
                placeholder=""
            />
            <van-field
                v-model="blood_pressure.afternoonPressure"
                label="中午"
                placeholder=""
            />
            <van-field
                v-model="blood_pressure.eveningPressure"
                label="晚间"
                placeholder=""
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
                placeholder=""
            />
            <van-field
                v-model="sport_diet.afternoonSport"
                label="中午"
                placeholder=""
            />
            <van-field
                v-model="sport_diet.eveningSport"
                label="晚间"
                placeholder=""
            />
            <div>饮食</div>
            <van-field
                v-model="sport_diet.breakfast"
                label="早餐"
                placeholder=""
            />
            <van-field v-model="sport_diet.lunch" label="午餐" placeholder="" />
            <van-field
                v-model="sport_diet.dinner"
                label="晚餐"
                placeholder=""
            />
            <van-field
                v-model="sport_diet.betweenMeals"
                label="间食"
                placeholder=""
            />
        </div>
        <div
            v-else-if="diaryMethod.value === 'examination'"
            class="calendar-type"
        >
            <van-field
                v-model="examination.examType"
                label="早晨"
                placeholder=""
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
    Toast,
} from 'vant';
import NavBar from '@/components/NavBar.vue';
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
                morningPressure: '',
                afternoonPressure: '',
                eveningPressure: '',
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
        };
    },
    watch: {
        diaryMethod() {
            this.fileList = [];
        },
    },
    computed: {},
    mounted() {
        this.pId = sessionStorage.getItem('PID');
    },
    components: {
        [Button.name]: Button,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Picker.name]: Picker,
        [Field.name]: Field,
        [Popup.name]: Popup,
        [Uploader.name]: Uploader,
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
        margin: 10px 0 0 0;
    }
    .btn-group {
        margin: 20px 15px 0 0;
        text-align: right;
    }
}
</style>
