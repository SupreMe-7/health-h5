<template>
    <div class="my-consultation">
        <NavBar title="我的咨询" />
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
                        上级医生:
                        <span class="item-value">{{ item.superiorName }}</span>
                        <span class="item-time">{{ item.replyTime }}</span>
                    </div>
                    <div class="row">
                        回复内容:
                        <span class="item-value">
                            {{
                                item.advice || '您的上级医生暂未回复当前咨询'
                            }}</span
                        >
                    </div>
                </div>
            </div>
        </van-list>
    </div>
</template>

<script>
import { Toast, List, Divider } from 'vant';
import NavBar from '@/components/NavBar.vue';
export default {
    data() {
        return {
            dId: null,
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
        this.dId = sessionStorage.getItem('DID');
    },
    components: {
        [Divider.name]: Divider,
        [List.name]: List,
        NavBar,
    },
    methods: {
        onLoad() {
            this.loading = true;
            this.currPage = this.currPage + 1;
            this.$api
                .post(`/qkys/api/doc/getDoctorConsultByDId`, {
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
        border-radius: 4px;
        padding: 10px;
        background: #fff;
        margin-bottom: 30px;
        .row {
            margin-bottom: 6px;
        }
        .item-value {
            color: rgba(0, 0, 0, 0.75);
        }
        .item-time {
            margin-left: 10px;
            color: rgba(0, 0, 0, 0.75);
        }
    }
}
</style>
