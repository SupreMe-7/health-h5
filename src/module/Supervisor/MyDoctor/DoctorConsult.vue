<template>
    <div class="my-consultation">
        <NavBar title="全科医生咨询" />
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <div v-for="(item, index) in list" :key="index">
                <div class="item">
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
        </van-list>
    </div>
</template>

<script>
import { Toast, List } from 'vant';
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
    mounted() {
        this.dId = this.$route.query.dId;
        this.sId = sessionStorage.getItem('SID');
    },
    components: {
        [List.name]: List,
        NavBar,
    },
    methods: {
        onLoad() {
            this.loading = true;
            this.currPage = this.currPage + 1;
            this.$api
                .post(`/qkys/api/sup/getDoctorConsultByDIdSupId`, {
                    supId: this.sId,
                    dId: this.dId,
                    currPage: this.currPage,
                    pageSize: this.pageSize,
                })
                .then(res => {
                    const { data } = res;
                    this.list = this.list.concat(data.list);
                    this.loading = false;
                    this.currPage = data.currPage;
                    if (this.currPage >= data.totalPage) {
                        this.finished = true;
                    }
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
