<template>
    <div class="my-patients">
        <NavBar title="患者列表" />
        <div v-if="list.length">
            <div v-for="(item, index) in list" :key="index">
                <div class="item" @click="onClick(item)">
                    <div class="left">
                        <div class="name">{{ item.name }}</div>
                        <div class="doctor">全科医生：{{ item.docName }}</div>
                        <div class="address">
                            {{ item.province }}{{ item.city
                            }}{{ item.district }}
                        </div>
                    </div>
                </div>
                <van-divider />
            </div>
        </div>
        <div>
            <van-empty description="暂无患者" />
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

import { Button, Col, Row, Toast, Divider, Empty } from 'vant';
export default {
    data() {
        return {
            sId: null,
            list: [],
        };
    },
    components: {
        NavBar,
        [Col.name]: Col,
        [Row.name]: Row,
        [Button.name]: Button,
        [Divider.name]: Divider,
        [Empty.name]: Empty,
    },
    async mounted() {
        this.sId = sessionStorage.getItem('SID');
        await this.getPatients();
    },
    methods: {
        getPatients() {
            this.$api
                .get(`/qkys/api/sup/getPatientsBySupId/${this.sId}`)
                .then(res => {
                    const { data = [] } = res;
                    this.list = data;
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
        onClick(item) {
            this.$router.push(
                `/supervisor/cur-patients?pId=${item.pId}&dId=${item.dId}&pName=${item.name}&dName=${item.docName}`
            );
        },
    },
};
</script>

<style lang="less" scoped>
.my-patients {
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
    .doctor {
        font-size: 14px;
        opacity: 0.8;
    }
    .address {
        margin: 3px 0;
        font-size: 14px;
        color: #5f5b5b;
    }
}
</style>
