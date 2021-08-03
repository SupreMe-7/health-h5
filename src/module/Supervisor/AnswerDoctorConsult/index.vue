<template>
    <div class="answer-doctor-consult">
        <NavBar title="回复全科医生咨询" />
        <div class="item">
            <van-row>
                <van-col span="12">{{ item.name }}</van-col>
                <van-col span="12">时间: {{ item.time }}</van-col>
            </van-row>
            <div class="explain">
                患者情况说明: {{ item.content }}
                <van-button type="info" size="mini">患者详情</van-button>
            </div>
            <div>咨询内容: {{ item.msg }}</div>
            <div class="textarea">
                <van-field
                    v-model="advice"
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
                <van-button type="info" @click="check(item.id)"
                    >提交</van-button
                >
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { Col, Row, Button, Field } from 'vant';

export default {
    data() {
        return {
            advice: '',
            item: {
                id: 1,
                name: 'xxx医生',
                time: '2016',
                content: '情况说明',
                msg: '咨询内容',
            },
        };
    },
    components: {
        NavBar,
        [Col.name]: Col,
        [Row.name]: Row,
        [Button.name]: Button,
        [Field.name]: Field,
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
