<template>
    <div class="chat-list">
        <div
            class="chat-item"
            v-for="(item, index) in list"
            :key="index"
            @click="
                $router.push(
                    `/doctor/patient-chat?pId=${item.pId}&name=${item.patientName}`
                )
            "
        >
            <van-badge
                v-if="+item.unReadNum !== 0"
                :content="item.unReadNum"
                max="99"
            >
                <img class="chat-avator" :src="item.profileIcon" alt="" />
            </van-badge>
            <img v-else class="chat-avator" :src="item.profileIcon" alt="" />

            <div class="item-content">
                <div class="item-one">
                    <div class="chat-name">
                        {{ item.patientName }}
                    </div>
                    <div class="chat-time">{{ item.updateTime }}</div>
                </div>
                <div class="item-two">{{ item.lastText }}</div>
            </div>
        </div>
        <TabBar type="doctor" :nowKey="2"></TabBar>
    </div>
</template>

<script>
import TabBar from '@/components/TabBar.vue';

import { Toast, Badge } from 'vant';
export default {
    data() {
        return {
            dId: '',
            list: [],
        };
    },
    mounted() {
        this.dId = sessionStorage.getItem('DID');
        this.getChatList();
    },
    components: {
        TabBar,
        [Badge.name]: Badge,
    },
    methods: {
        getChatList() {
            this.$api
                .get(`/qkys/api/doc/getDocotorLastChat/${this.dId}`)
                .then(res => {
                    this.list = res.data;
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
    },
};
</script>

<style lang="less" scoped>
.chat-list {
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    .chat-item {
        width: 100%;
        display: flex;
        margin-bottom: 12px;
        .chat-avator {
            padding-bottom: 8px;
            flex-shrink: 0;
            width: 60px;
            height: 60px;
            object-fit: contain;
        }
        .item-content {
            padding-left: 10px;
            width: 100%;
            border-bottom: 1px solid #ebe5e5;
            .item-one {
                display: flex;
                justify-content: space-between;
                .chat-name {
                    font-size: 20px;
                    color: #161616;
                }
                .chat-time {
                    font-size: 14px;
                    color: #b4b4b4;
                }
            }
            .item-two {
                padding-top: 8px;
                color: #9a9a9a;
            }
        }
    }
}
</style>
