<template>
    <div class="data-statistics">
        <NavBar title="数据统计" />
        <div class="fun-content">
            <div
                v-for="(item, index) in funList"
                :key="index"
                class="fun-item"
                @click="download(item.url)"
            >
                {{ item.label }}
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
    data() {
        return {
            funList: [
                {
                    label: '患者疾病数据分析',
                    url:
                        'https://qkys.zhugaotech.com/downloads/patient_analysis.xlsx',
                },
                {
                    label: '医生工作量情况统计',
                    url:
                        'https://qkys.zhugaotech.com/downloads/doctor_data.xlsx',
                },
            ],
        };
    },
    components: {
        NavBar,
    },
    mounted() {},
    methods: {
        download(url) {
            window.open(url);
        },
    },
};
</script>

<style lang="less" scoped>
.data-statistics {
    padding: 10px 20px;
    .fun-content {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        .fun-item {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 0 20px 0;
            width: 80%;
            height: 100px;
            background-color: #59a7e7;
            color: #fff;
            font-size: 24px;
        }
    }
}
</style>
