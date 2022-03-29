<template>
    <div class="answer-doctor-consult">
        <NavBar title="回复全科医生咨询" />
        <div class="item">
            <van-row>
                <van-col span="12">{{ item.doctorName }}医生</van-col>
                <van-col span="12">时间: {{ item.createTime }}</van-col>
            </van-row>
            <div class="explain">
                患者情况说明: {{ item.patientInformation }}
                <van-button
                    type="info"
                    size="mini"
                    round
                    :to="
                        `/supervisor/patients-detail?dId=${item.dId}&pId=${item.pId}`
                    "
                    >患者详情</van-button
                >
            </div>
            <div>咨询内容: {{ item.consult }}</div>
            <div class="textarea">
                <van-field
                    v-model="reply"
                    rows="8"
                    autosize
                    label="回复建议"
                    type="textarea"
                    maxlength="200"
                    placeholder="请输入回复建议"
                    show-word-limit
                />
            </div>
            <div class="btn-group">
                <van-button type="info" @click="submit" round>提交</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { Col, Row, Button, Field, Toast } from 'vant';

export default {
    data() {
        return {
            reply: '',
            item: {},
        };
    },
    components: {
        NavBar,
        [Col.name]: Col,
        [Row.name]: Row,
        [Button.name]: Button,
        [Field.name]: Field,
    },
    mounted() {
        this.item = JSON.parse(sessionStorage.getItem('new-doctor-consult'));
    },
    methods: {
        submit() {
            this.$api
                .post(`/qkys/api/sup/addSuperiorReply`, {
                    consultId: this.item.id,
                    pId: this.item.pId,
                    dId: this.item.dId,
                    reply: this.reply,
                })
                .then(res => {
                    Toast('提交成功');
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
    },
};
</script>

<style lang="less" scoped>
.answer-doctor-consult {
    .item {
        padding: 10px;
        .explain {
            margin: 5px 0;
            display: flex;
            align-items: center;
        }
        .textarea {
            margin: 10px 0 0 0;
            border: 1px solid black;
        }
        .btn-group {
            padding: 0 10px;
            margin: 10px 0 0 0;
            text-align: right;
        }
    }
}
</style>
