<template>
    <div class="new-doctor-apply">
        <NavBar title="新全科医生申请" />
        <div v-for="(item, index) in list" :key="index" class="item">
            <div>
                <div>{{ item.name }}医生</div>
                <div>{{ item.hospital }}医院</div>
                <div>{{ item.time }}</div>
            </div>
            <div class="btn-group">
                <van-button
                    v-if="true"
                    type="info"
                    :to="`/supervisor/answer-doctor-consult?Id=`"
                    >查看</van-button
                >
                <div v-else>已通过</div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { Button } from 'vant';
export default {
    data() {
        return {
            list: [
                {
                    id: 1,
                    name: 'xxx',
                    hospital: '哈尔滨',
                    time: '20166',
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
        [Button.name]: Button,
    },
    async mounted() {
        await this.getApply();
    },
    methods: {
        getApply() {
            console.log('获取申请');
        },
        check(id) {
            console.log(id);
        },
    },
};
</script>

<style lang="less" scoped>
.new-doctor-apply {
    .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
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
