<template>
    <div class="user-manage-pa">
        <NavBar title="患者用户" />
        <div class="search">
            <van-popover
                v-model="showPopover"
                trigger="click"
                :actions="actions"
                @select="onSelect"
            >
                <template #reference>
                    <van-button plain round type="primary" size="small"
                        >{{ searchType }}<van-icon name="arrow-down"
                    /></van-button>
                </template>
            </van-popover>
            <van-search
                v-model="param"
                show-action
                :clearable="false"
                placeholder="请输入搜索关键词"
                @search="onSearch"
            >
                <template #action>
                    <div @click="onSearch">搜索</div>
                </template>
            </van-search>
        </div>
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
import NavBar from '@/components/NavBar.vue';
import {
    Badge,
    Toast,
    List,
    Divider,
    Popover,
    Search,
    Button,
    Icon,
} from 'vant';
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
            searchType: null,
            param: null,
            showPopover: false,
            actions: [],
        };
    },
    components: {
        NavBar,
        [Badge.name]: Badge,
        [List.name]: List,
        [Popover.name]: Popover,
        [Divider.name]: Divider,
        [Search.name]: Search,
        [Button.name]: Button,
        [Icon.name]: Icon,
    },
    mounted() {
        this.getActions();
    },
    methods: {
        onLoad() {
            this.loading = true;
            this.currPage = this.currPage + 1;
            this.$api
                .post(`/qkys/api/admin/getPatientBySearch`, {
                    searchType: this.searchType,
                    param: this.param,
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
                    } else {
                        this.finished = false;
                    }
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        getActions() {
            this.$api
                .get(`/qkys/api/admin/getPatientSearchType`)
                .then(res => {
                    const { data } = res;
                    this.actions = data.map(item => {
                        return { text: item };
                    });
                    this.searchType = this.actions[0].text;
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        onClick(item) {
            this.$router.push(`/admin/user-manage/pa/cur-pa?pId=${item.pId}`);
        },
        onSearch() {
            this.currPage = 0;
            this.list = [];
            this.onLoad();
        },
        onSelect(action) {
            this.searchType = action.text;
        },
    },
};
</script>

<style lang="less" scoped>
.user-manage-pa {
    padding: 10px 20px;
    .search {
        display: flex;
        align-items: center;
        .van-button {
            width: 110px;
        }
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
