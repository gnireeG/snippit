<template>
    <AppLayout title="Teams">
        <div class="p-8">
            <h1 class="heading-1">Teams</h1>
            <p class="text-lg mt-2">Current team: <b class="italic">{{ $page.props.auth.user.current_team.name }}</b></p>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Owner</th>
                        <th>Members</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="team in otherTeams">
                        <tr>
                            <td>{{ team.name }}</td>
                            <td>{{ team.owner.name }}</td>
                            <td>{{ team.users_count }}</td>
                        </tr>
                    </template>
                </tbody>
            </table>
            <p>{{ otherTeams }}</p>
        </div>
    </AppLayout>
</template>
<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import { usePage } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue'
const props = defineProps({
    teams: Object
})

const currentTeam = usePage().props.auth.user.current_team

const otherTeams = ref([])

onMounted(() =>{
    otherTeams.value = Object.values(props.teams).filter(team => team.id !== currentTeam.id)
})

</script>