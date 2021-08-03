<template>
    <div class="new-doctor-consult">
        <NavBar title="新全科医生咨询" />
        <div v-for="(item, index) in list" :key="index" class="item">
            <van-row>
                <van-col span="12">{{ item.name }}</van-col>
                <van-col span="12">{{ item.time }}</van-col>
            </van-row>
            <div>患者情况说明: {{ item.content }}</div>
            <div>咨询内容: {{ item.msg }}</div>
            <div class="btn-group">
                <van-button type="info" @click="check(item.id)"
                    >查看</van-button
                >
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { Col, Row, Button } from 'vant';
export default {
    data() {
        return {
            list: [
                {
                    id: 1,
                    name: 'xxx医生',
                    time: '2016',
                    content: '情况说明',
                    msg: '咨询内容',
                },
                {
                    id: 2,
                    name: 'xxx医生',
                    time: '2016',
                    content: '情况说明',
                    msg: '咨询内容',
                },
            ],
        };
    },
    components: {
        NavBar,
        [Col.name]: Col,
        [Row.name]: Row,
        [Button.name]: Button,
    },
    async mounted() {
        await this.getConsult();
    },
    methods: {
        getConsult() {
            console.log('获取咨询');
        },
        check(id) {
            console.log(id);
        },
    },
};
</script>

<style lang="less" scoped>
.new-doctor-consult {
    .item {
        padding: 10px;
        border-bottom: 1px solid rgb(120, 117, 117);
        .btn-group {
            padding: 0 10px;
            margin: 10px 0 0 0;
            text-align: right;
        }
    }
}
</style>
