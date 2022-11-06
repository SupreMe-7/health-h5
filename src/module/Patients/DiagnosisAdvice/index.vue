<template>
    <div class="diagnosis-advice">
        <NavBar title="医生建议" />
        <van-tabs v-model="active">
            <van-tab title="全科医生">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                >
                    <div
                        class="item"
                        v-for="(item, index) in list"
                        :key="index"
                    >
                        <div class="item-title">
                            <span>医生: {{ item.docName }}</span>
                            <span>时间: {{ item.createTime }}</span>
                        </div>
                        <div class="item-content">建议:{{ item.advice }}</div>
                        <div
                            v-if="item.pics && item.pics.length"
                            class="show-item-img"
                        >
                            <van-image
                                v-for="(ele, index) in item.pics"
                                :key="index"
                                width="30%"
                                :src="ele"
                                @click="
                                    ImagePreview({
                                        images: item.pics,
                                        startPosition: index,
                                    })
                                "
                            />
                        </div>
                    </div>
                </van-list>
            </van-tab>
            <van-tab title="上级医生"
                ><van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                >
                    <div
                        class="item"
                        v-for="(item, index) in list"
                        :key="index"
                    >
                        <div class="item-title">
                            <span>医生: {{ item.docName }}</span>
                            <span>时间: {{ item.createTime }}</span>
                        </div>
                        <div class="item-content">建议:{{ item.advice }}</div>
                        <div
                            v-if="item.pics && item.pics.length"
                            class="show-item-img"
                        >
                            <van-image
                                v-for="(ele, index) in item.pics"
                                :key="index"
                                width="30%"
                                :src="ele"
                                @click="
                                    ImagePreview({
                                        images: item.pics,
                                        startPosition: index,
                                    })
                                "
                            />
                        </div>
                    </div> </van-list
            ></van-tab>
        </van-tabs>
    </div>
</template>

<script>
// 诊疗建议
import { Tab, Tabs, List, Toast, Image as VanImage } from 'vant';
import NavBar from '@/components/NavBar.vue';
import { getPId } from '@/common/util.js';
export default {
    data() {
        return {
            pId: null,
            list: [],
            active: 0,
            loading: false,
            finished: false,
            currPage: 0,
            pageSize: 10,
            totalPage: null,
            path: '',
        };
    },
    computed: {},
    mounted() {
        this.pId = getPId();
    },
    watch: {
        active() {
            this.finished = false;
            this.loading = true;
            this.totalPage = null;
            this.currPage = 0;
            this.list = [];
            this.onLoad();
        },
    },
    components: {
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [List.name]: List,
        [VanImage.name]: VanImage,
        NavBar,
    },
    methods: {
        onLoad() {
            this.currPage = this.currPage + 1;
            if (this.active === 0) {
                this.$api
                    .post(`/qkys/api/getDoctorAdvice`, {
                        pId: this.pId,
                        currPage: this.currPage,
                        pageSize: this.pageSize,
                    })
                    .then(res => {
                        const { data } = res;
                        this.path = data.path;
                        data.list.forEach(item => {
                            item.pics = [];
                            item.picPath1 &&
                                item.pics.push(this.path + item.picPath1);
                            item.picPath2 &&
                                item.pics.push(this.path + item.picPath2);
                            item.picPath3 &&
                                item.pics.push(this.path + item.picPath3);
                        });
                        this.list = this.list.concat(data.list);
                        this.loading = false;
                        this.currPage = data.currPage;
                        if (this.currPage >= data.totalPage) {
                            this.finished = true;
                        }
                    })
                    .catch(e => {
                        this.finished = true;
                        Toast(e.errMsg);
                    });
            }
            if (this.active === 1) {
                this.$api
                    .post(`/qkys/api/getSuperiorAdvice `, {
                        pId: this.pId,
                        currPage: this.currPage,
                        pageSize: this.pageSize,
                    })
                    .then(res => {
                        const { data } = res;
                        this.path = data.path;
                        data.list.forEach(item => {
                            item.pics = [];
                            item.picPath1 &&
                                item.pics.push(this.path + item.picPath1);
                            item.picPath2 &&
                                item.pics.push(this.path + item.picPath2);
                            item.picPath3 &&
                                item.pics.push(this.path + item.picPath3);
                        });
                        this.list = this.list.concat(data.list);
                        this.loading = false;
                        this.currPage = data.currPage;
                        if (this.currPage >= data.totalPage) {
                            this.finished = true;
                        }
                    })
                    .catch(e => {
                        this.finished = true;
                        Toast(e.errMsg);
                    });
            }
        },
    },
};
</script>

<style lang="less" scoped>
.diagnosis-advice {
    padding: 0 10px;
    .item {
        margin: 10px;
        padding: 10px;
        border: 1px solid #e2e2e2;
        .item-title {
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
        }
    }
    .show-item-img {
        margin: 10px 0 0 0;
        display: flex;
        flex-wrap: wrap;
        .van-image {
            margin-right: 8px;
        }
    }
}
</style>
