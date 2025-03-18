<template>
    <router-view v-slot="{ Component, route}">
      <transition name="fade" mode="out-in">
        <keep-alive>
            <div>
                <component :is="Component" :key="route.fullPath"/>
            </div>
        </keep-alive>
      </transition>
    </router-view>
  </template>
  