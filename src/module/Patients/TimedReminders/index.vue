<template>
    <div class="timed-reminders">
        <van-cell-group>
            <van-cell center title="添加监测日历定时提醒">
                <template #right-icon>
                    <van-switch :value="checked" size="24" @input="onInput" />
                </template>
            </van-cell>
            <van-cell
                v-if="checked"
                center
                title="时间"
                :value="time"
                @click="popupShow = true"
            ></van-cell>
            <van-popup v-model="popupShow" position="bottom">
                <van-datetime-picker
                    v-model="popupTime"
                    type="time"
                    title="选择时间"
                    @cancel="popupShow = false"
                    @confirm="confirm"
                />
            </van-popup>
        </van-cell-group>
    </div>
</template>

<script>
import { Switch, Cell, CellGroup, Toast, DatetimePicker, Popup } from 'vant';
import { getPId } from '@/common/util.js';

export default {
    data() {
        return {
            pId: '',
            checked: false,
            popupShow: false,
            popupTime: '00:00',
            time: '00:00',
        };
    },
    components: {
        [Switch.name]: Switch,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [DatetimePicker.name]: DatetimePicker,
        [Popup.name]: Popup,
    },
    mounted() {
        this.pId = getPId();
        this.getTime();
    },

    methods: {
        onInput(checked) {
            if (checked === false) {
                this.closeTimedReminders();
            }
            this.checked = checked;
        },
        getTime() {
            this.$api
                .get(`/qkys/api/getNotifyDailyByPId/${this.pId}`)
                .then(res => {
                    if (res.data === null) {
                        this.checked = false;
                    } else {
                        this.checked = true;
                        this.time = res.data.hour + ':' + res.data.minute;
                    }
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        confirm(value) {
            this.$api
                .post(`/qkys/api/setNotifyDaily`, {
                    pId: this.pId,
                    hour: value.slice(0, 2),
                    minute: value.slice(3, 5),
                })
                .then(() => {
                    this.time = value;
                    this.popupTime = value;
                    this.popupShow = false;
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        closeTimedReminders() {
            this.$api
                .get(`/qkys/api/closeNotifyDailyByPId/${this.pId}`)
                .then(() => {
                    Toast('关闭成功');
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
    },
};
</script>

<style lang="less" scoped>
.timed-reminders {
    padding: 10px 0;
}
</style>
