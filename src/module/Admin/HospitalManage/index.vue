<template>
    <div class="admin-msg-manage">
        <NavBar title="机构管理" />
        <div class="btn-group">
            <van-button type="info" to="/admin/hospital-manage-add"
                >添加机构</van-button
            >
        </div>

        <div
            v-for="(item, index) in list"
            :key="index"
            class="notice-list-item"
            @click="viewHospital(item)"
        >
            <div class="notice-item-topic">
                <div class="topic-text">
                    {{ item.hospital }}
                </div>
                <div class="time">
                    {{ item.province }}{{ item.city }}{{ item.district }}
                </div>
            </div>
            <van-divider />
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { Toast, Button, Divider } from 'vant';
export default {
    data() {
        return {
            list: [],
        };
    },
    components: {
        NavBar,
        [Button.name]: Button,
        [Divider.name]: Divider,
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            this.$api
                .get(`/qkys/api/admin/getHospital`)
                .then(res => {
                    const { data } = res;
                    this.list = data;
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        viewHospital(item) {
            this.$router.push(
                `/admin/hospital-manage-detail?detail=${JSON.stringify(item)}`
            );
        },
    },
};
</script>

<style lang="less" scoped>
.admin-msg-manage {
    .btn-group {
        padding: 20px;
    }
    .notice-list-item {
        margin: 10px 0;
        padding: 0 10px;
        font-size: 18px;
        .notice-item-topic {
            margin: 5px 0;
            .topic-text {
                margin-right: 5px;
                flex-grow: 1;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .time {
                flex-shrink: 0;
                font-size: 14px;
                color: #969799;
            }
        }
        .notice-item-content {
            font-size: 14px;
            color: #969799;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
}
</style>
