<template>
    <div class="my-superior">
        <NavBar title="上级医生" />
        <div class="title">您的上级医生</div>
        <div class="content" v-if="hasSup">
            <div class="item" v-for="(item, index) in superior" :key="index">
                <div class="item-content">
                    <div>
                        {{ item.supName }} {{ item.level }}
                        <div class="item-hospital">
                            {{ item.specialty }}
                            <br />
                            {{ item.hospital }}
                        </div>
                    </div>
                    <van-button
                        round
                        type="info"
                        :to="`/doctor/super-consultation?supId=${item.supId}`"
                        >查询我的咨询</van-button
                    >
                </div>
                <van-divider />
            </div>
        </div>
        <div v-else class="no-content">
            暂无上级医生
            <van-divider />
        </div>

        <div class="title">您已申请待确认的上级医生</div>
        <div v-if="hasNewSelect" class="content">
            <div class="item" v-for="(item, index) in selectSup" :key="index">
                {{ item.hospital }}{{ item.specialty }}{{ item.level
                }}{{ item.supName }}
                <van-divider />
            </div>
        </div>
        <div v-else class="no-content">
            暂无待确认的上级医生
            <van-divider />
        </div>

        <div class="btn-group">
            <van-button type="info" to="/doctor/chose-superior" round
                >申请新的上级医生</van-button
            >
        </div>
    </div>
</template>

<script>
import { Button, Divider, Toast } from 'vant';
import NavBar from '@/components/NavBar.vue';

export default {
    data() {
        return {
            dId: null,
            superior: [],
            hasNewSelect: false,
            hasSup: false,
            selectSup: [],
        };
    },
    computed: {},
    mounted() {
        this.dId = sessionStorage.getItem('DID');
        this.getSuperior();
    },
    components: {
        [Button.name]: Button,
        [Divider.name]: Divider,
        NavBar,
    },
    methods: {
        getSuperior() {
            this.$api
                .get(`/qkys/api/doc/getSupsByDId/${this.dId}`)
                .then(res => {
                    this.superior = res.data.superior;
                    this.hasNewSelect = res.data.hasNewSelect;
                    this.hasSup = res.data.hasSup;
                    this.selectSup = res.data.selectSup;
                })
                .catch(e => {
                    Toast(e.errMsg);
                });
        },
    },
};
</script>

<style lang="less" scoped>
.my-superior {
    padding: 0 10px;
    .title {
        font-size: 16px;
        margin: 15px 0;
    }
    .item-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .no-content {
        text-align: center;
        font-size: 16px;
    }
    .item-hospital {
        color: #6e6a6a;
    }
    .btn-group {
        padding: 10px;
        text-align: right;
    }
}
</style>
