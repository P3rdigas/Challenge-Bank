<script setup lang="ts">
    import { ref } from 'vue';
    import { doc, collection, setDoc, query, where, getDocs, limit , serverTimestamp } from "firebase/firestore";
    import { db } from '../firebase.ts'
    import { user } from '../composables/auth.ts';
    import { FriendRequestStatus } from '../types/FriendRequestStatus.ts';
    import Navbar from '../components/Navbar.vue';
    import NextEventDisplay from '../components/NextEventDisplay.vue';

    const friendName = ref('');

    const friendRequest = async () => {
        if (!user.value) {
            alert("Log in first!");
            return;
        }

        const currentUid = user.value.uid;

        const q = query(
            collection(db, 'users'),
            where('username', '==', friendName.value),
            limit(1)
        );

        const snap = await getDocs(q);
            
        if (snap.empty) {
            alert("Username not found!");
            return;
            // throw new Error("Username not found!");
        }

        const targetUid = snap.docs[0]!.id;

        if (targetUid === currentUid) {
            alert("You can't add yourself!");
            return;
        }

        // TODO: optimize double checking
        const existingFriendQ1 = query(
            collection(db, 'friends'),
            where('sender_id', '==', currentUid),
            where('receiver_id', '==', targetUid),
            limit(1)
        );

        const existingFriendSnap1 = await getDocs(existingFriendQ1);

        if (!existingFriendSnap1.empty) {
            if (existingFriendSnap1.docs[0]!.data().status === FriendRequestStatus.PENDING) {
                alert("Friend request already sent!");
                return;
            } else if (existingFriendSnap1.docs[0]!.data().status === FriendRequestStatus.ACCEPTED) {
                alert("You are already friends!");
                return;
            }
        }

        const existingFriendQ2 = query(
            collection(db, 'friends'),
            where('sender_id', '==', targetUid),
            where('receiver_id', '==', currentUid),
            limit(1)
        );

        const existingFriendSnap2 = await getDocs(existingFriendQ2);

        if (!existingFriendSnap2.empty) {
            if (existingFriendSnap2.docs[0]!.data().status === FriendRequestStatus.PENDING) {
                alert("Friend request already sent!");
                return;
            } else if (existingFriendSnap2.docs[0]!.data().status === FriendRequestStatus.ACCEPTED) {
                alert("You are already friends!");
                return;
            }
        }

        // Add friend request
        await setDoc(doc(collection(db, 'friends')), {
            created_at: serverTimestamp(),
            receiver_id: targetUid,
            responded_at: null,
            sender_id: currentUid,
            status: FriendRequestStatus.PENDING,
        });
    }   
</script>

<template>
    <div class="home-page">
        <Navbar />
        <NextEventDisplay />
        <div class="home-wrapper">
            <div class="home-left"></div>
            <div class="home-right">
                <div class="home-right-box">
                    <h1>Add Friend</h1>
                    <div class="home-right-box-form">
                        <form class="add-friend-form" v-on:submit.prevent="friendRequest">
                            <input v-model="friendName" type="text" placeholder="Username" required />
                            <button type="submit">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .home-page {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
    }

    .home-wrapper {
        flex: 1;
        background-color: aqua;
        display: flex;
    }

    .home-left {
        background-color: brown;
        width: 50%;
    }

    .home-right {
        background-color: gold;
        width: 50%;
        display: flex;
        justify-content: center;
    }

    .home-right-box {
        width: 80%;
        height: 50%;
        background-color: white;
        border-radius: 2.5%;
        margin-top: 3vh;
    }
</style>