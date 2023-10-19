<!--
 * @Author: 18300875296 1453622610@qq.com
 * @Date: 2023-10-14 09:14:25
 * @LastEditors: 18300875296 1453622610@qq.com
 * @LastEditTime: 2023-10-14 09:48:48
 * @FilePath: \Testc:\Admin\GitHub\volunteer-server\client\src\components\home\HomeBodyHeader.vue
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
-->
<template>
  <div class="content_item-team">
    <template v-for="team in hotTeams" :key="team.team_id">
      <cookie-card class="team_item">
        <template #title>
          <div class="team_item-image">
            <img :src="team.logo" />
          </div>
        </template>
        <div class="team_item-name">{{ team.name }}</div>
        <div class="team_item-hot">热门指数 {{ team.read_count }}</div>
        <template #footer>
          <router-link :to="`/team/${team.team_id}`" class="team_item-application"
            ><svg viewBox="0 0 1084 1024" width="14" height="14">
              <path
                d="M707.764706 514.228706a255.337412 255.337412 0 1 1 0-510.674824 255.337412 255.337412 0 0 1 0 510.674824z m0-60.235294a195.102118 195.102118 0 1 0 0-390.204236 195.102118 195.102118 0 0 0 0 390.204236z"
                fill="currentColor"
              ></path>
              <path
                d="M566.633412 54.633412l-25.901177 54.39247a177.272471 177.272471 0 1 0 35.418353 298.164706l37.948236 46.742588a237.507765 237.507765 0 1 1-47.465412-399.36z"
                fill="currentColor"
              ></path>
              <path
                d="M921.238588 503.928471a30.117647 30.117647 0 1 1-26.804706 53.910588 420.321882 420.321882 0 0 0-606.991058 376.711529 30.117647 30.117647 0 0 1-60.235295 0 480.557176 480.557176 0 0 1 694.031059-430.682353z"
                fill="currentColor"
              ></path>
              <path
                d="M545.852235 464.956235a30.117647 30.117647 0 0 1-14.095059 58.548706 334.607059 334.607059 0 0 0-413.214117 325.330824 30.117647 30.117647 0 1 1-60.235294 0A394.842353 394.842353 0 0 1 545.792 465.016471z"
                fill="currentColor"
              ></path>
              <path
                d="M996.773647 785.347765a30.117647 30.117647 0 0 1 0 60.235294h-241.302588a30.117647 30.117647 0 1 1 0-60.235294h241.302588z"
                fill="currentColor"
              ></path>
              <path
                d="M906.24 936.056471a30.117647 30.117647 0 1 1-60.235294 0v-241.242353a30.117647 30.117647 0 1 1 60.235294 0v241.302588z"
                fill="currentColor"
              ></path>
            </svg>
            加入
          </router-link>
        </template>
      </cookie-card>
    </template>
  </div>
</template>
<script setup lang="ts">
import { useHomeBodyHeader } from './main';

const { hotTeams } = await useHomeBodyHeader({ page: 1, pagesize: 2, orderKey: 'read_count' });
</script>
