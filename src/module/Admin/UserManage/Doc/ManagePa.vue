<template>
    <div class="my-sufferer">
        <NavBar title="管理的患者" />
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <div v-for="(item, index) in list" :key="index">
                <div class="item" @click="onClick(item)">
                    <div class="left">
                        <div class="name">{{ item.name }}</div>
                        <div class="address">
                            {{ item.province }}{{ item.city
                            }}{{ item.district }}
                        </div>
                    </div>
                </div>
                <van-divider />
            </div>
        </van-list>
    </div>
</template>

<script>
import { Button, Divider, Toast, List } from 'vant';
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
    computed: {},
    mounted() {
        this.dId = this.$route.query.dId;
    },
    components: {
        [Button.name]: Button,
        [Divider.name]: Divider,
        [List.name]: List,
        NavBar,
    },
    methods: {
        onLoad() {
            this.currPage = this.currPage + 1;
            this.$api
                .get(`/qkys/api/admin/getPatientsByDId/${this.dId}`)
                .then(res => {
                    const { data = [] } = res;
                    this.list = this.list.concat(data);
                    this.loading = false;
                    this.finished = true;
                    // this.currPage = data.currPage;
                    // if (this.currPage >= data.totalPage) {
                    //     this.finished = true;
                    // }
                })
                .catch(e => {
                    this.finished = true;
                    Toast(e.errMsg);
                });

            this.currPage = this.currPage + 1;
            this.finished = true;
        },
        onClick(item) {
            this.$router.push(`/admin/user-manage/pa/cur-pa?pId=${item.pId}`);
        },
    },
};
</script>

<style lang="less" scoped>
.my-sufferer {
    padding: 10px;
    .title {
        margin-bottom: 12px;
        text-align: center;
        font-size: 22px;
    }
    .item {
        .van-button {
            margin-right: 4px;
        }
    }
    .left {
        flex-grow: 1;
    }
    .name {
        font-size: 18px;
        opacity: 0.8;
    }
    .address {
        margin: 3px 0;
        font-size: 14px;
        color: #5f5b5b;
    }
}
</style>
