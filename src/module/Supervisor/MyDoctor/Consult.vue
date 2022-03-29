<template>
    <div class="my-consultation">
        <NavBar title="医生咨询" />
        <div v-for="(item, index) in list" :key="index">
            <div class="item">
                <div class="row">
                    患者姓名:
                    <span class="item-value">{{ item.patientName }}</span>
                </div>
                <div class="row">
                    全科医生:
                    <span class="item-value">{{ item.doctorName }}</span>
                </div>
                <div class="row">
                    咨询时间:
                    <span class="item-value">{{ item.createTime }}</span>
                </div>
                <div class="row">
                    患者情况说明:
                    <span class="item-value">{{
                        item.patientInformation
                    }}</span>
                </div>
                <div class="row">
                    咨询内容:
                    <span class="item-value">{{ item.consult }}</span>
                </div>
                <div class="row">
                    回复时间:
                    <span class="item-value">{{ item.superiorName }}</span>
                    <span class="item-time">{{ item.replyTime }}</span>
                </div>
                <div class="row">
                    回复内容:
                    <span class="item-value">
                        {{ item.advice || '您暂未回复当前咨询' }}</span
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant';
import NavBar from '@/components/NavBar.vue';
export default {
    data() {
        return {
            dId: null,
            sId: null,
            list: [],
            loading: false,
            finished: false,
            currPage: 0,
            pageSize: 10,
            totalPage: null,
        };
    },
    watch: {},
    computed: {},
    async mounted() {
        this.pId = this.$route.query.pId;
        this.sId = sessionStorage.getItem('SID');
        await this.onLoad();
    },
    components: {
        NavBar,
    },
    methods: {
        onLoad() {
            this.$api
                .post(`/qkys/api/sup/getDoctorConsultByPIdSupId`, {
                    supId: this.sId,
                    pId: this.pId,
                })
                .then(res => {
                    const { data = [] } = res;
                    this.list = data;
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
    },
};
</script>

<style lang="less" scoped>
.my-consultation {
    background: #f8f8f8;
    padding: 20px;
    .item {
        padding: 10px;
        border-radius: 4px;
        background: #fff;
        margin-bottom: 30px;
        .row {
            margin-bottom: 6px;
        }
        .item-value {
            color: rgba(0, 0, 0, 0.65);
        }
        .item-time {
            margin-left: 10px;
            color: rgba(0, 0, 0, 0.65);
        }
    }
}
</style>
