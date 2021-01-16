<template>
    <div class="add-calendar">
        <NavBar />
        <div class="chose-upload-type">
            <van-field
                readonly
                clickable
                label="上传类型"
                :value="calendarType"
                placeholder="请选择上传的类型"
                @click="choseTypePicker = true"
            />
            <van-popup v-model="choseTypePicker" round position="bottom">
                <van-picker
                    show-toolbar
                    :columns="calendarTypeList"
                    @cancel="choseTypePicker = false"
                    @confirm="confirmType"
                />
            </van-popup>
        </div>
        <div v-if="calendarType === '血糖'" class="calendar-type">
            <van-field
                v-model="sugar.beforeBreakfastSugar"
                type="number"
                label="早餐前"
                placeholder="请输入血糖值"
            />
            <van-field
                v-model="sugar.afterBreakfastSugar"
                type="number"
                label="早餐后"
                placeholder="请输入血糖值"
            />
            <van-field
                v-model="sugar.beforeLunchSugar"
                type="number"
                label="午餐前"
                placeholder="请输入血糖值"
            />
            <van-field
                v-model="sugar.afterLunchSugar"
                type="number"
                label="午餐后"
                placeholder="请输入血糖值"
            />
            <van-field
                v-model="sugar.beforeDinnerSugar"
                type="number"
                label="晚餐前"
                placeholder="请输入血糖值"
            />
            <van-field
                v-model="sugar.afterDinnerSugar"
                type="number"
                label="晚餐后"
                placeholder="请输入血糖值"
            />
            <van-field
                v-model="sugar.beforeSleepSugar"
                type="number"
                label="睡前"
                placeholder="请输入血糖值"
            />
        </div>
        <div v-else-if="calendarType === '血压'" class="calendar-type">
            <van-field v-model="value" label="早晨" placeholder="" />
            <van-field v-model="value" label="中午" placeholder="" />
            <van-field v-model="value" label="晚间" placeholder="" />
        </div>
        <div v-else-if="calendarType === '运动/饮食'" class="calendar-type">
            <div>运动</div>
            <van-field v-model="value" label="早晨" placeholder="" />
            <van-field v-model="value" label="中午" placeholder="" />
            <van-field v-model="value" label="晚间" placeholder="" />
            <div>饮食</div>
            <van-field v-model="value" label="早晨" placeholder="" />
            <van-field v-model="value" label="中午" placeholder="" />
            <van-field v-model="value" label="晚间" placeholder="" />
        </div>
        <div v-else-if="calendarType === '辅助检查'" class="calendar-type">
            <van-field v-model="value" label="早晨" placeholder="" />
            <van-field v-model="value" label="中午" placeholder="" />
            <van-field v-model="value" label="晚间" placeholder="" />
        </div>
        <div v-if="calendarType">
            <van-uploader v-model="fileList" accept="image/*" max-count="3" />
        </div>
        <div v-if="calendarType" class="btn-group">
            <van-button
                type="info"
                @click="uploadCalendar"
                :loading="loading"
                loading-text="上传中..."
                >上传</van-button
            >
        </div>
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
            calendarType: '',
            calendarTypeList: ['血糖', '血压', '运动/饮食', '辅助检查'],
            fileList: [],
            pics: [],
            sugar: {
                afterBreakfastSugar: null,
                afterDinnerSugar: null,
                afterLunchSugar: null,
                beforeBreakfastSugar: null,
                beforeDinnerSugar: null,
                beforeLunchSugar: null,
                beforeSleepSugar: null,
            },
        };
    },
    watch: {
        calendarType() {
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
            this.calendarType = value;
            this.choseTypePicker = false;
        },
        // 循环处理图片压缩
        async lrz() {
            let pics = [];
            try {
                for (let item of this.fileList) {
                    let res = await this.$lrz(item.file);
                    pics.push(res.base64.split(',')[1]);
                }
            } catch {
                Toast('压缩图片失败');
            }
            return pics;
        },
        async uplodaSugar() {
            let pics = await this.lrz();
            this.$api
                .post('/qkys/api/addBloodSugarDiary', {
                    pId: this.pId,
                    data: this.sugar,
                    hasPic: !!this.fileList.length,
                    pics: pics,
                })
                .then(res => {
                    Toast('上传成功');
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        uploadCalendar() {
            this.loading = true;
            console.log('上传');
            this.uplodaSugar().finally(() => {
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
