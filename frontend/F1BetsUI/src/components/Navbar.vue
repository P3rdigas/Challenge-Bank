<script setup lang="ts">
    import { computed } from 'vue';
    import { signOut } from 'firebase/auth';
    import { auth } from '../firebase.ts';
    import router from '../router/index.ts';
    import { useFriendRequests } from '../composables/FriendsRequestListener.ts';
    import InviteCard from './InviteCard.vue';
    import { InviteType } from '../types/InviteType.ts';

    const { receivedRequests, sentRequests } = useFriendRequests();

    const receivedCount = computed(() => {
        return receivedRequests.value.length;
    });

    const sentCount = computed(() => {
        return sentRequests.value.length;
    });

    const logout = async () => {
        try {
            await signOut(auth);
            router.push({ name: 'Main' });
        } catch (error) {
            console.error('Logout error:', error);
        }
    } 
</script>

<template>
    <div class="navbar-wrapper">
        <div class="invites-dropdown">
            <button>
                <font-awesome-icon icon="fa-solid fa-user-group" style="color: rgb(187, 182, 182);" />
            </button>
            <div class="content">
                <div v-if="receivedCount + sentCount === 0"> No Requests </div>
                <div v-else> 
                    <div v-if="sentRequests.length">
                        <InviteCard 
                            v-for="req in sentRequests" 
                            :id="req.id"
                            :sender_id="req.sender_id"
                            :receiver_id="req.receiver_id"
                            :username="req.username"
                            :type=InviteType.SENT
                        />
                    </div>

                    <div v-if="receivedRequests.length">
                        <InviteCard
                            v-for="req in receivedRequests"
                            :id="req.id"
                            :sender_id="req.sender_id"
                            :receiver_id="req.receiver_id"
                            :username="req.username"
                            :type=InviteType.RECEIVED
                        />
                    </div>
                </div>
            </div>
        </div>
        <button @click="logout">Logout</button>
    </div>
</template>

<style scoped>
    .navbar-wrapper {
        background-color: blue;
        width: 100vw;
        height: 5vh;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .navbar-wrapper button {
        margin-right: 1vw;
    }

    .navbar-wrapper button {
        cursor: pointer;
    }

    .invites-dropdown {
        display: inline-block;
    }

    .invites-dropdown button {
        background-color: gray;
        color: white;
        border: none;
    }

    .invites-dropdown .content {
        display: none;
        position: absolute;
        background-color: white;
        box-shadow: 2px, 2px 5px black;
    }

    .invites-dropdown:hover .content {
        display: block;
    }
</style>