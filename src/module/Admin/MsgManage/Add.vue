<template>
    <div class="add">
        <NavBar title="添加系统消息" />
        <van-cell-group>
            <van-field
                size="large"
                v-model="topic"
                label="标题"
                placeholder="请输入内容"
            />
            <van-field
                size="large"
                v-model="message"
                label="内容"
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

            <van-field
                readonly
                clickable
                size="large"
                label="截止时间"
                :value="expireTimeText"
                placeholder="请选择截止时间"
                @click="showTimePicker = true"
            />
            <van-popup v-model="showTimePicker" round position="bottom">
                <van-datetime-picker
                    v-model="expireTime"
                    type="date"
                    title="选择年月日"
                    :min-date="minDate"
                    :max-date="maxDate"
                    @confirm="timeConfirm"
                    @cancel="showTimePicker = false"
                />
            </van-popup>
        </van-cell-group>
        <div class="btn-group">
            <van-button type="info" @click="addMsg">提交</van-button>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import {
    Field,
    Toast,
    Picker,
    Popup,
    CellGroup,
    Button,
    DatetimePicker,
} from 'vant';
export default {
    data() {
        return {
            showPicker: false,
            showTimePicker: false,
            adminId: null,
            topic: '',
            message: '',
            role: '',
            roleText: '',
            expireTime: new Date(),
            expireTimeText: '',
            minDate: new Date(),
            maxDate: new Date(2030, 0, 1),
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
        };
    },
    mounted() {
        this.adminId = sessionStorage.getItem('adminId');
    },
    components: {
        NavBar,
        [Field.name]: Field,
        [Picker.name]: Picker,
        [Popup.name]: Popup,
        [CellGroup.name]: CellGroup,
        [Button.name]: Button,
        [DatetimePicker.name]: DatetimePicker,
    },
    methods: {
        addMsg() {
            this.$api
                .post(`/qkys/api/admin/addSystemMsg`, {
                    topic: this.topic,
                    message: this.message,
                    role: this.role,
                    expireTime: this.expireTime,
                    adminId: this.adminId,
                })
                .then(() => {
                    this.$router.back();
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        onConfirm(value) {
            this.roleText = value.text;
            this.role = value.value;
            this.showPicker = false;
        },
        timeConfirm(value) {
            const time = new Date(value);
            this.expireTime = time.getTime() / 1000;
            console.log(this.expireTime);
            this.expireTimeText = time.toLocaleDateString();
            this.showTimePicker = false;
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
