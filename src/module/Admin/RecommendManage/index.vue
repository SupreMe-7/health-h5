<template>
    <div class="admin-recommend-manage">
        <NavBar title="推荐阅读管理" />
        <div class="btn-group">
            <van-button type="info" to="/admin/recommend-manage-add"
                >添加推荐阅读</van-button
            >
        </div>
        <div class="recommend-content">
            <div
                class="recommend-item"
                v-for="(item, index) in recommend"
                :key="index"
                @click="toDetail(item)"
            >
                <div v-if="item.picNum === 1">
                    <div class="recommend-title">
                        <div class="title">{{ item.title }}</div>
                        <img :src="item.picUrl1" alt="" />
                    </div>
                    <div class="recommend-time">
                        <span class="webset"> {{ item.website }}</span>
                        {{ item.createTime }}
                    </div>
                </div>
                <div v-if="item.picNum === 2">
                    <div class="recommend-title-two">
                        <div class="title-img">
                            <img :src="item.picUrl1" alt="" />
                            <img :src="item.picUrl2" alt="" />
                        </div>
                        <div class="title">{{ item.title }}</div>
                    </div>
                    <div class="recommend-time">
                        <span class="webset"> {{ item.website }}</span>
                        {{ item.createTime }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { Toast, Button } from 'vant';
export default {
    data() {
        return {
            recommend: [],
        };
    },
    components: {
        NavBar,
        [Button.name]: Button,
    },
    mounted() {
        this.getRecommend();
    },
    methods: {
        getRecommend() {
            this.$api
                .get(`/qkys/api/admin/getRecommandRead`)
                .then(res => {
                    const { data } = res;
                    this.recommend = data;
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        toDetail(detail) {
            this.$router.push(
                `/admin/recommend-manage-detail?detail=${JSON.stringify(
                    detail
                )}`
            );
        },
    },
};
</script>

<style lang="less" scoped>
.admin-recommend-manage {
    .btn-group {
        padding: 20px;
    }
    font-size: 22px;
    .recommend-content {
        font-size: 14px;
        .recommend-item {
            border-radius: 4px;
            margin-bottom: 12px;
            background: #fff;
            padding: 10px;
        }
        .recommend-title {
            display: flex;
            font-size: 18px;
            margin-bottom: 4px;
            color: #222;
            .title {
                flex-grow: 1;
            }
            img {
                flex-shrink: 0;
                margin-left: 18px;
                border-radius: 4px;
                width: 70px;
                height: 70px;
            }
        }
        .recommend-title-two {
            margin-bottom: 4px;
            .title-img {
                display: flex;
                justify-content: space-between;
                img {
                    object-fit: cover;
                    width: 48%;
                    border-radius: 4px;
                    height: 90px;
                }
            }
            .title {
                margin-top: 8px;
                font-size: 18px;
                color: #222;
            }
        }
        .recommend-time {
            .webset {
                margin-right: 8px;
            }
            margin-top: 4px;
            font-size: 12px;
            color: #666;
        }
    }
}
</style>
