<template>
  <div class="home-wrapper">
    <main class="home-main">
      <section class="main_item-hot">
        <template v-for="article in likestArticles" :key="article.article_id">
          <cookie-card class="hot_item" @click="handleClickOpenArticle(article.article_id)">
            <template #title>
              <router-link :to="`/discuss/${article.article_id}`" class="hot__item-title">{{
                article.title
              }}</router-link>
              <span class="hot__item-tag">热议中</span>
            </template>
            {{ article.summary }}
            <template #footer>
              <span class="hot__item-icon">
                <div class="icon_item">
                  <img src="https://p3-passport.byteimg.com/img/mosaic-legacy/3795/3047680722~100x100.awebp" />
                </div>
                <div class="icon_item">
                  <img src="https://p3-passport.byteimg.com/img/mosaic-legacy/3795/3047680722~100x100.awebp" />
                </div>
                <div class="icon_item">
                  <img src="https://p3-passport.byteimg.com/img/mosaic-legacy/3795/3047680722~100x100.awebp" />
                </div>
              </span>
              <span class="hot__item-text">{{ article.readCount }}用户正在围观</span>
              <span class="hot__item-go"
                >进入讨论
                <svg
                  id="mx_n_1682751513297"
                  t="1682751513293"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="6036"
                  width="12"
                  height="12"
                >
                  <path
                    d="M899.903689 478.177684L498.564974 76.711126c-16.975299-16.903995-44.421496-16.903995-61.397818 0-16.976322 16.974603-16.976322 44.558845 0 61.534472l373.471922 373.455597L437.167157 885.300055c-16.976322 16.975627-16.976322 44.420699 0 61.396325 16.976322 16.974603 44.422519 16.974603 61.397818 0l401.338715-401.326365c9.338052-9.267061 13.085553-21.573341 12.309855-33.668821C912.989242 499.680417 909.241741 487.441675 899.903689 478.177684zM597.730478 511.701195c0.850402-12.021801-2.96771-24.260543-12.164539-33.523511L184.224153 76.711126c-16.975299-16.903995-44.418425-16.903995-61.536993 0-16.975299 16.974603-16.833053 44.558845 0 61.534472l373.614168 373.455597-373.614168 373.59886c-16.833053 16.975627-16.975299 44.420699 0 61.396325 17.118567 16.974603 44.560671 16.974603 61.536993 0l401.341785-401.326365C594.762768 536.103978 598.58088 523.797697 597.730478 511.701195z"
                    fill="#0a84ff"
                    p-id="6037"
                  ></path>
                </svg>
              </span>
            </template>
          </cookie-card>
        </template>
      </section>
      <cookie-card class="main_item-content">
        <template #title>
          <div class="content_item-title">
            <svg viewBox="0 0 1024 1024" width="24" height="24" class="title-icon">
              <path
                d="M541.86 912H179.71c-37.33 0-67.71-30.45-67.71-67.84V346.51c0-37.39 30.38-67.84 67.71-67.84h251.12v34.84H179.71c-18.16 0-32.93 14.8-32.93 33v497.66c0 18.2 14.78 33 32.93 33h362.14V912z"
                fill="#ffa116"
              ></path>
              <path
                d="M844.29 912H481.16c-37.33 0-67.71-30.45-67.71-67.84V179.84c0-37.39 30.38-67.84 67.71-67.84h363.13c37.33 0 67.71 30.45 67.71 67.84v664.32c0 37.39-30.38 67.84-67.71 67.84zM481.16 146.84c-18.16 0-32.93 14.8-32.93 33v664.32c0 18.2 14.78 33 32.93 33h363.13c18.16 0 32.93-14.8 32.93-33V179.84c0-18.2-14.78-33-32.93-33H481.16z"
                fill="#ffa116"
              ></path>
              <path
                d="M765.46 470.82H559.98c-19.96 0-36.19-16.26-36.19-36.23 0-20 16.24-36.27 36.19-36.27h205.49c19.96 0 36.19 16.26 36.19 36.27 0 19.97-16.24 36.23-36.2 36.23z m-205.48-51.61c-8.46 0-15.34 6.91-15.34 15.38s6.88 15.34 15.34 15.34h205.49c8.46 0 15.34-6.87 15.34-15.34s-6.88-15.38-15.34-15.38H559.98zM765.46 585.2H559.98c-19.96 0-36.19-16.26-36.19-36.27 0-19.97 16.24-36.23 36.19-36.23h205.49c19.96 0 36.19 16.26 36.19 36.23 0 20-16.24 36.27-36.2 36.27z m-205.48-51.61c-8.46 0-15.34 6.87-15.34 15.34s6.88 15.38 15.34 15.38h205.49c8.46 0 15.34-6.91 15.34-15.38s-6.88-15.34-15.34-15.34H559.98zM765.46 707.6H559.98c-19.96 0-36.19-16.26-36.19-36.27 0-19.97 16.24-36.23 36.19-36.23h205.49c19.96 0 36.19 16.26 36.19 36.23 0 20.01-16.24 36.27-36.2 36.27z m-205.48-51.61c-8.46 0-15.34 6.87-15.34 15.34s6.88 15.38 15.34 15.38h205.49c8.46 0 15.34-6.91 15.34-15.38s-6.88-15.34-15.34-15.34H559.98z"
                fill="#ffa116"
              ></path>
            </svg>
            <span class="title-text">热门志愿团体</span>
            <router-link to="/team" class="title-more"
              >更多
              <svg viewBox="0 0 1024 1024" width="10" height="10">
                <path
                  d="M307.6 104.6c-14.2 14.2-14.2 37.2 0 51.4L655 503.4c2.8 2.9 2.8 7.5 0 10.3L307.6 861.2c-14.2 14.2-14.2 37.2 0 51.4 14.2 14.2 37.2 14.2 51.4 0l347.4-347.4c15.6-15.6 23.4-36 23.4-56.5s-7.8-41-23.4-56.5L359 104.6c-14.2-14.2-37.2-14.2-51.4 0z"
                  fill="currentColor"
                ></path>
              </svg>
            </router-link>
          </div>
        </template>
        <template #default>
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
          <template v-for="article in newestArticles" :key="article.article_id">
            <div class="article-divider"></div>
            <div class="article">
              <router-link
                v-if="article.images !== '[]'"
                class="article_item-cover"
                :to="`/discuss/${article.article_id}`"
              >
                <img :src="article.images" />
              </router-link>
              <div class="article_item-content">
                <div class="article__item-title">
                  <div class="title_item-content">
                    <img
                      src="https://p3-passport.byteimg.com/img/mosaic-legacy/3795/3047680722~100x100.awebp"
                      class="title__item-icon"
                    />
                    <span class="title__item-span">发布了</span>
                    <router-link :to="`/discuss/${article.article_id}`" class="title__item-text">{{
                      article.title
                    }}</router-link>
                  </div>
                  <div class="title_item-time">{{ $formatRelativeTime(article.create_at) }}</div>
                </div>
                <router-link :to="`/discuss/${article.article_id}`">
                  <p class="article__item-content">{{ article.summary }}</p>
                </router-link>
                <div class="article__item-tags">
                  <div class="tag_item">
                    <svg
                      t="1682830913221"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="3700"
                      width="14"
                      height="14"
                    >
                      <path
                        d="M822.72 415.424c0-175.296-164.032-317.952-365.44-317.952-201.536 0-365.44 142.656-365.44 317.952 0 105.152 59.008 202.368 158.336 261.824v102.528c0 6.272 3.456 12.032 8.96 14.912a16.448 16.448 0 0 0 17.344-0.832l46.656-30.72c0.768-0.512 1.408-1.088 2.176-1.728l53.504-35.712c26.624 5.056 52.928 7.68 78.464 7.68 201.472 0 365.44-142.656 365.44-317.952z m-365.504 284.032c-25.472 0-51.904-2.816-78.528-8.256a16.96 16.96 0 0 0-12.864 2.432l-61.632 41.216c-0.768 0.384-1.472 0.96-2.112 1.472l-18.048 12.032v-80.896a16.96 16.96 0 0 0-8.576-14.656c-93.76-52.928-149.76-141.632-149.76-237.376 0-156.672 148.672-284.032 331.584-284.032 182.784 0 331.648 127.424 331.648 284.032 0 156.672-148.864 284.032-331.712 284.032z m409.6-174.144a181.12 181.12 0 0 1 36.48 107.904c0 68.288-40.064 131.84-107.264 169.664a16.96 16.96 0 0 0-8.64 14.72v50.624l-5.824-3.776a9.088 9.088 0 0 0-1.792-1.408l-45.12-30.208c-3.776-2.432-8.448-3.456-12.8-2.432-79.296 16.448-156.096-1.536-213.312-44.48l-20.352 27.136c63.232 47.36 147.392 68.032 233.536 51.904l37.248 24.96c0.704 0.576 1.28 1.024 1.984 1.344l34.048 22.592a17.472 17.472 0 0 0 17.344 0.832 17.024 17.024 0 0 0 9.024-14.976V827.52c72.64-44.48 115.776-116.352 115.776-194.24 0-45.504-14.848-89.792-43.136-128l-27.2 20.032z"
                        p-id="3701"
                        fill="currentColor"
                      ></path>
                    </svg>
                    文章
                  </div>
                  <template v-for="(tag, index) in JSON.parse(article.tags)" :key="index">
                    <div class="tag_item">{{ tag }}</div>
                  </template>
                </div>
              </div>
            </div>
          </template>
        </template>
      </cookie-card>
      <button class="more-loading-btn" @click="handleClick">加载更多</button>
    </main>
    <aside class="home-aside">
      <cookie-input placeholder="搜索志愿活动、志愿团体、用户..." :border="false" class="aside_item-input">
        <template #icon>
          <svg viewBox="0 0 1024 1024" width="20" height="20">
            <path
              d="M912.072815 946.738335c-4.78498 0-9.56996-1.824555-13.220093-5.475711L650.662083 693.076078c-0.285502-0.285502-0.561795-0.579191-0.827855-0.883113l-6.979972-7.948019c-6.671956-7.594979-6.096858-19.11843 1.297552-26.012444 32.130791-29.958312 57.424874-65.413825 75.181283-105.379049 18.374486-41.35692 27.691689-85.472674 27.691689-131.122363 0-86.355787-33.628912-167.542854-94.691639-228.604558-61.062727-61.062727-142.249795-94.691639-228.604558-94.691639s-167.541831 33.628912-228.604558 94.691639c-61.062727 61.062727-94.691639 142.249795-94.691639 228.604558s33.628912 167.542854 94.691639 228.604558c61.062727 61.062727 142.249795 94.691639 228.604558 94.691639 26.15059 0 52.16508-3.130294 77.326133-9.301853 5.090948-1.353834 73.4038-19.189038 120.842229-14.809287 10.282181 0.948605 17.847483 10.05296 16.899902 20.335141s-10.047844 17.853623-20.335141 16.899902c-41.659819-3.845585-107.272165 13.571087-107.930151 13.747095-0.125867 0.033769-0.251733 0.065492-0.3776 0.097214-28.132734 6.91755-57.20998 10.425444-86.425372 10.425444-48.684816 0-95.922676-9.538237-140.402727-28.352745-42.953278-18.166755-81.523735-44.172035-114.644063-77.290317-33.119305-33.119305-59.123562-71.691809-77.29134-114.644063-18.813484-44.479027-28.352745-91.716888-28.352745-140.401704s9.53926-95.922676 28.352745-140.402727c18.167778-42.953278 44.172035-81.524758 77.29134-114.644063 33.119305-33.119305 71.690786-59.123562 114.644063-77.29134 44.480051-18.813484 91.717911-28.352745 140.402727-28.352745s95.922676 9.53926 140.401704 28.352745c42.953278 18.167778 81.524758 44.173059 114.644063 77.29134 33.118282 33.119305 59.123562 71.690786 77.29134 114.644063 18.813484 44.480051 28.351722 91.717911 28.351722 140.402727 0 50.912553-10.399861 100.136651-30.91101 146.305157-17.285688 38.906102-40.96704 73.973782-70.526263 104.47547l242.313791 242.310721c7.302313 7.30129 7.302313 19.138896 0.001023 26.440186C921.642774 944.912757 916.857794 946.738335 912.072815 946.738335z"
              fill="currentColor"
            ></path>
            <path
              d="M165.576059 421.887656c-0.696872 0-1.400906-0.038886-2.110057-0.118704-10.260691-1.152243-17.645892-10.404977-16.493649-20.666692 4.838192-43.080168 17.974373-83.934644 39.046295-121.429607 5.058203-9.002025 16.457834-12.19781 25.458835-7.139607 9.002025 5.058203 12.19781 16.45681 7.139607 25.458835-18.605753 33.108049-30.207999 69.202105-34.484396 107.282399C183.060269 414.827867 174.967964 421.887656 165.576059 421.887656z"
              fill="currentColor"
            ></path>
          </svg>
        </template>
      </cookie-input>
      <section class="aside_item-slide">
        <swiper :slides-per-view="1" :space-between="50" :modules="modules" :speed="1000" :autoplay="{ delay: 3000 }">
          <template v-for="slide of slidesData" :key="slide.slide_id">
            <swiper-slide><img :src="slide.url" /></swiper-slide>
          </template>
        </swiper>
      </section>
      <section class="aside_item-active">
        <img src="http://127.0.0.1:9000/article/image_1682686732281_518.jpg" alt="" />
      </section>
      <cookie-card class="aside_item-action">
        <template #title>
          <router-link to="#" class="action_item">
            <svg
              t="1682838799604"
              class="action_item-icon1"
              viewBox="0 0 1041 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5878"
              width="1em"
              height="1em"
            >
              <path
                d="M813.124267 211.968c0-41.5232-30.498133-75.434667-68.096-75.434667h-529.408c-37.546667 0-68.096 33.7408-68.096 75.349334v600.234666c0 41.745067 30.481067 75.349333 68.096 75.349334h529.408c37.546667 0 68.096-33.774933 68.096-75.434667v-99.0208a51.2 51.2 0 0 0-51.2 51.2v47.837867c0 14.4384-8.823467 24.2176-16.896 24.2176h-529.408c-8.157867 0-16.896-9.659733-16.896-24.149334v-600.234666c0-14.404267 8.823467-24.149333 16.896-24.149334h529.408c8.021333 0 16.896 9.8304 16.896 24.234667v121.856a51.2 51.2 0 0 0 51.2 51.2V211.968z"
                fill="#ffffff"
                p-id="5879"
              ></path>
              <path d="M284.0576 324.266667l375.466667 0 0 51.2-375.466667 0 0-51.2Z" fill="#ffffff" p-id="5880"></path>
              <path d="M284.0576 477.866667l238.933333 0 0 51.2-238.933333 0 0-51.2Z" fill="#ffffff" p-id="5881"></path>
              <path d="M284.0576 631.466667l238.933333 0 0 51.2-238.933333 0 0-51.2Z" fill="#ffffff" p-id="5882"></path>
              <path
                d="M955.665067 425.147733L708.317867 632.712533l-46.813867 5.7344 13.8752-44.936533 247.381333-207.581867 32.904534 39.2192z m-10.1376-91.733333a25.6 25.6 0 0 0-36.061867-3.157333l-272.776533 228.864a25.6 25.6 0 0 0-8.004267 12.066133l-17.749333 57.463467c-11.042133 35.771733 14.250667 65.8432 51.336533 61.2864l59.818667-7.338667a25.6 25.6 0 0 0 13.329066-5.802667l272.776534-228.864a25.6 25.6 0 0 0 3.157333-36.078933l-65.826133-78.4384z"
                fill="#ffffff"
                p-id="5883"
              ></path>
            </svg>
            发布文章</router-link
          >
          <router-link to="#" class="action_item">
            <svg
              t="1682840942904"
              class="action_item-icon2"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="11190"
              width="1em"
              height="1em"
            >
              <path
                d="M924.3 245s12.5 139.2-95.7 274c-49.7 62-109.7 89.8-152.9 106.5 0 0 155.6 37.4 236.5-131S924.3 245 924.3 245z"
                fill="#ffffff"
                p-id="11191"
              ></path>
              <path
                d="M690.6 958.7c-2.6 0-5.3-0.9-7.5-2.6-5.2-4.1-6.1-11.7-1.9-16.9 0.7-0.9 68.1-87.5 29.4-150.8-37.3-61.1-12-86.9-9-89.6l16.2 17.8 0.4-0.4c-0.1 0.2-13.7 16 12.9 59.6 19.9 32.6 20.7 74 2.1 119.9-13.5 33.4-32.4 57.5-33.2 58.5-2.3 3-5.8 4.5-9.4 4.5zM333.4 982.1c-2.5 0-5-0.8-7.1-2.3-5.4-3.9-6.5-11.5-2.6-16.8 0.7-0.9 66.3-92.3 29.3-161.8-33.1-62.3-11.7-98.6-10.8-100.2 3.5-5.7 10.9-7.5 16.6-4 5.6 3.4 7.4 10.7 4.1 16.4-0.8 1.4-14.6 27.6 11.4 76.5 18.4 34.7 18.8 78.3 0.9 126.1-13.1 35.2-31.3 60.2-32.1 61.2-2.4 3.2-6 4.9-9.7 4.9zM827.3 607c-2.1 0-4.1-0.8-5.7-2.4l-25.4-25.4c-3.1-3.1-3.1-8.2 0-11.4 3.1-3.1 8.2-3.1 11.4 0l25.4 25.4c3.1 3.1 3.1 8.2 0 11.4-1.6 1.6-3.7 2.4-5.7 2.4zM786.5 625c-2.1 0-4.1-0.8-5.7-2.4l-18.5-18.5c-3.1-3.1-3.1-8.2 0-11.4 3.1-3.1 8.2-3.1 11.4 0l18.5 18.5c3.1 3.1 3.1 8.2 0 11.4-1.6 1.7-3.7 2.4-5.7 2.4zM751.1 647.1c-2.1 0-4.1-0.8-5.7-2.4l-23.2-23.3c-3.1-3.1-3.1-8.2 0-11.4 3.1-3.1 8.2-3.1 11.4 0l23.2 23.3c3.1 3.1 3.1 8.2 0 11.4-1.6 1.6-3.7 2.4-5.7 2.4zM859.4 582.2c-2.1 0-4.1-0.8-5.7-2.4l-29.6-29.6c-3.1-3.1-3.1-8.2 0-11.4 3.1-3.1 8.2-3.1 11.4 0l29.6 29.6c3.1 3.1 3.1 8.2 0 11.4-1.6 1.6-3.6 2.4-5.7 2.4zM882.2 546.8c-2.1 0-4.1-0.8-5.7-2.4L849 516.9c-3.1-3.1-3.1-8.2 0-11.4s8.2-3.1 11.4 0l27.5 27.5c3.1 3.1 3.1 8.2 0 11.4-1.6 1.6-3.7 2.4-5.7 2.4zM908 516.4c-2.1 0-4.1-0.8-5.7-2.4l-27.9-27.9c-3.1-3.1-3.1-8.2 0-11.4 3.1-3.1 8.2-3.1 11.4 0l27.9 27.9c3.1 3.1 3.1 8.2 0 11.4-1.6 1.6-3.6 2.4-5.7 2.4zM924 472.8c-2.1 0-4.1-0.8-5.7-2.4L894.8 447c-3.1-3.1-3.1-8.2 0-11.4 3.1-3.1 8.2-3.1 11.4 0l23.5 23.5c3.1 3.1 3.1 8.2 0 11.4-1.6 1.5-3.7 2.3-5.7 2.3zM938.9 429.2c-2.1 0-4.1-0.8-5.7-2.4l-22-22c-3.1-3.1-3.1-8.2 0-11.4 3.1-3.1 8.2-3.1 11.4 0l22 22c3.1 3.1 3.1 8.2 0 11.4-1.6 1.6-3.7 2.4-5.7 2.4zM947.9 387.3c-2.1 0-4.1-0.8-5.7-2.4L920 362.7c-3.1-3.1-3.1-8.2 0-11.4s8.2-3.1 11.4 0l22.3 22.3c3.1 3.1 3.1 8.2 0 11.4-1.7 1.6-3.7 2.3-5.8 2.3z"
                fill="#ffffff"
                p-id="11192"
              ></path>
              <path
                d="M762.6 647.9c-1.7-5.2-3.4-10.3-4.9-14.4-7.4 3.4-15.2 7.7-24.2 3.9 4.6 12.4 14.8 41.2 11.3 47.1-2.6 4.4-26.9 8.8-47.4 8.8-15 0-28-2.3-28.9-8.8-1.3-8.9 8.1-30.7 17.6-47.8-7.5-2.6-13.6-7.6-21.3-11.2-1.4 2.5-2.8 5.1-4.2 8-18.5 36.4-16.6 49.6-15.8 54.5 0.9 6.1 5.3 20.8 26.9 26.5 7 1.8 15.7 2.8 25.9 2.8 11.2 0 23.9-1.1 34.8-3.1 18.4-3.4 28-8.4 33.4-17.4 5.7-10.4 5-23.2-3.2-48.9zM407 643.9c-1-3-2-5.8-3-8.6-7.7 2.9-15 5.8-23.2 6.7 5.5 15.3 12.3 36.5 9.1 41.7-3 4.8-30.8 9.6-54.3 9.6-17.2 0-32.1-2.6-33.1-9.6-1.1-7.3 4.6-22.4 12-37.5-8.5-0.4-16.7-1.8-23.9-5.8-14.4 30.5-12.6 42.3-11.9 47 4.6 30.1 44 30.1 57 30.1 12.6 0 26.8-1.2 39-3.4 20.1-3.5 30.1-8.5 35.8-17.7 6.7-10.9 5.8-24.7-3.5-52.5z"
                fill="#ffffff"
                p-id="11193"
              ></path>
              <path
                d="M437.5 611.5c-33.6 14.4-67.3 21.1-99.9 21.1-117 0-218.9-86.4-243.8-213.9-20.8-107.1 12.3-214.6 81.8-282.6C225.1 87.8 285.1 66 344.4 66c81.4 0 161.5 41.1 211.1 110.8 5.4-7.1 9.3-14.5 14.3-21.3-14.3-18.8-31-35.9-49.9-51.1-50.5-40.3-112.8-62.5-175.5-62.5V66 41.9c-69.9 0-134.1 26.6-185.6 77-76.6 74.9-110.6 191.6-88.5 304.4 13.2 67.5 46.1 125.7 95.2 168.4 48.3 41.9 109.4 65 172.2 65 36.9 0 73.7-7.8 109.4-23 37.3-16 70.1-39.9 97.2-69.2-4.2-7-7.6-15.1-11.6-23.2-26.1 30-58.2 54.4-95.2 70.2z"
                fill="#ffffff"
                p-id="11194"
              ></path>
              <path
                d="M701.1 128.3c98.9 0 200.3 65.9 226.9 163.6 24.7 91-7.2 197.6-73.5 265.8-38.1 39.2-89.6 64.9-145.8 64.9-3.3 0-6.7-0.1-10.1-0.3-88.4-4.8-152.2-58.6-178.1-138.3-23.5-72.1-25.2-153.4-2.8-226.1 7.5-24.5 18.8-45 33.4-62 40.2-47 94.7-67.6 150-67.6m0-24v24.1-24.1c-66.6 0-126.4 27-168.4 76.1-17 19.9-29.8 43.6-38.1 70.6-23.6 76.7-22.6 162.2 2.9 240.6 29.8 91.8 104.5 149.7 199.7 154.9 3.8 0.2 7.6 0.3 11.4 0.3 59.9 0 117.8-25.7 163.1-72.2 73.9-76 105.8-192.1 79.5-288.9-14.1-51.7-48.1-98.5-95.8-131.9-45.6-32-100.4-49.5-154.3-49.5zM154.1 262.2c-0.8 0-1.7-0.1-2.5-0.3-6.5-1.4-10.6-7.8-9.3-14.3 8.6-40.1 54-91.7 56-93.9 4.4-5 12-5.4 17-1s5.4 12 1 17c-0.4 0.5-43.2 49-50.4 82.9-1.3 5.7-6.3 9.6-11.8 9.6z"
                fill="#ffffff"
                p-id="11195"
              ></path>
              <path
                d="M138.5 309.4c-0.7 0-1.3-0.1-2-0.2-6.6-1.1-11-7.3-9.9-13.9l2.5-14.8c1.1-6.6 7.3-11 13.9-9.9 6.6 1.1 11 7.3 9.9 13.9l-2.5 14.8c-1 6-6.1 10.1-11.9 10.1z"
                fill="#ffffff"
                p-id="11196"
              ></path>
            </svg>
            参与活动</router-link
          >
        </template>
      </cookie-card>
      <cookie-card class="aside_item-article-hot">
        <template #title>
          <div class="article-hot-title">热门文章</div>
        </template>
        <template v-for="(article, index) of hottestList" :key="article.article_id">
          <div class="article-hot-li">
            <div class="li_item-index">{{ index + 1 }}</div>
            <div class="li_item-content">
              <router-link :to="`/discuss/${article.article_id}`" class="li__item-paragraph">
                <img src="https://p3-passport.byteimg.com/img/mosaic-legacy/3795/3047680722~100x100.awebp" />
                <span class="">{{ article.title }}</span>
                <img src="../assets/new.77389df8.png" />
              </router-link>
              <div class="li__item-summary">{{ article.summary }}</div>
            </div>
          </div>
        </template>
      </cookie-card>
      <cookie-card class="aside_item-article-hot">
        <template #title>
          <div class="article-hot-title">热门活动</div>
          <template v-for="(article, index) of hottestList" :key="article.article_id">
            <div class="article-hot-li">
              <div class="li_item-index">{{ index }}</div>
              <div class="li_item-content">
                <router-link :to="`/discuss/${article.article_id}`" class="li__item-paragraph">
                  <img src="https://p3-passport.byteimg.com/img/mosaic-legacy/3795/3047680722~100x100.awebp" />
                  <span class="">{{ article.content }}</span>
                  <img src="../assets/new.77389df8.png" />
                </router-link>
                <div class="li__item-summary">{{ article.summary }}</div>
              </div>
            </div>
          </template>
        </template>
      </cookie-card>
    </aside>
  </div>
</template>
<script lang="ts" setup>
import { onBeforeMount, ref, onBeforeUnmount, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper';
import { Article, SlideData, Team } from '../assets/interface';
import { getHottestAPI, getNewestAPI, getLikesAPI } from '../api/discuss';
import { getHotTeamsAPI } from '../api/team';
import CookieCard from '../components/cookie-card/CookieCard.vue';
import CookieInput from '../components/cookie-input/CookieInput.vue';
import useUserStore from '../store/user';

import { getSlidesAPI } from '../api/home';
import 'swiper/css';
import 'swiper/css/autoplay';

const slidesData = ref<SlideData[]>([]);
const modules = [Autoplay];
// const onSwiper = (swiper) => {
//   console.log(swiper);
// };
// const onSlideChange = () => {
//   console.log('slide change');
// };
const getSLides = async () => {
  const res = await getSlidesAPI('首页', 5);
  slidesData.value = res.data;
};

const hottestList = ref<Article[]>([]); // 热门文章
const likestArticles = ref<any[]>([]); // 最多讨论的文章
const hottestActives = ref([]); // 热门活动
const newestArticles = ref<any[]>([]); // 最新的文章
const hotTeams = ref<Team[]>([]);
const page = ref(0);
const pageSize = ref(10);
const total = ref(0);
// const articleList = ref<Article[]>([]);
const router = useRouter();

const handleClickOpenArticle = (article_id: string): void => {
  router.push(`/discuss/${article_id}`);
};
// 获取热门团队
const getHotTeams = async () => {
  const res = await getHotTeamsAPI();
  hotTeams.value = res.data.teams;
};
// 获取最多点赞文章
const getLikesArticles = async () => {
  const res = await getLikesAPI();
  likestArticles.value = res.data.articles;
};
// 获取最热文章
const getHotArticle = async () => {
  try {
    const { data } = await getHottestAPI();
    hottestList.value = data.articles;
  } catch (error) {
    console.log(error);
  }
};
// 获取最新文章
const getNewArticle = async () => {
  try {
    page.value += 1;
    const { data } = await getNewestAPI(page.value, pageSize.value);
    newestArticles.value = data.articles;
    total.value = data.last_page; // 记录最后的页数
    if (total.value === 0) {
      console.log('暂无数据');
    }
    if (total.value === 1) {
      // alert("暂时没有了");
    }
  } catch (error) {
    console.log(error);
  }
};
// 获取全部文章
const getMoreArticle = async () => {
  page.value += 1;
  if (total.value >= page.value) {
    const { data } = await getNewestAPI(page.value, pageSize.value);
    data.articles.forEach((article: any) => newestArticles.value.push(article));
  }
};
// --------获取用户数据---------------
const getUserInfo = async () => {
  const userStore = useUserStore();
  await userStore.getUserInfo();
};

const handleClick = async () => {
  await getMoreArticle();
};
onBeforeMount(async () => {
  await getLikesArticles();
  await getNewArticle();
  await getHotTeams();
  await getSLides();
  await getHotArticle();
});
onMounted(async () => {
  await nextTick();
  await getUserInfo();
});
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/**------------------------------------------------------------------------- */

.home-wrapper {
  max-width: 1000px;
  display: flex;
  justify-content: center;
  margin: 15px auto 0;
}
.home-main {
  display: flex;
  flex-flow: column wrap;
  flex: 1;
}
.home-aside {
  width: 256px;
  min-height: 400px;
  margin-left: 10px;
  user-select: none;
}
.home-aside > :not(:last-child) {
  margin-bottom: 12px;
}
/**------------------------------------------------------------------------- */
.main_item-hot {
  display: flex;
  flex-flow: nowrap;
  justify-content: space-between;
  min-height: 150px;
  overflow: hidden;
  gap: 10px;
}
.hot_item {
  width: 362px;
}
.hot__item-title {
  font-size: 16px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre;
  line-height: 20px;
  letter-spacing: 1.1px;
}
.hot__item-tag {
  flex: 0 0 auto;
  color: rgba(255, 161, 22, 1);
  font-size: 12px;
  line-height: 20px;
  background: rgba(255, 161, 22, 0.15);
  border-radius: 12px;
  padding: 2px 8px;
}
.hot__item-icon {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}
.icon_item {
  width: 16px;
  height: 16px;
}
.icon_item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
.hot__item-text {
  font-size: 14px;
  line-height: 18px;
  color: rgba(140, 140, 140, 1);
  text-indent: 6px;
}
.hot__item-go {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  position: absolute;
  gap: 2px;
  right: 0;
  color: var(--blue-color);
  font-size: 14px;
}
/* ************************************************* */
.main_item-content {
  margin: 15px 0;
  width: 750px;
  min-height: 600px;
  position: relative;
}

.content_item-title {
  display: flex;
  align-items: center;
  height: 22px;
}
.title-icon {
  margin-right: 8px;
}
.title-text {
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
  color: rgba(38, 38, 38, 1);
  letter-spacing: 1.1px;
}
.title-more {
  font-size: 12px;
  line-height: 17px;
  color: rgba(60, 60, 67, 0.6);
  position: absolute;
  right: 0;
  letter-spacing: 0.8px;
  display: flex;
  align-items: center;
}
.content_item-team {
  display: flex;
  justify-content: space-around;
  flex-flow: row nowrap;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  padding: 16px 0;
}

.team_item-image {
  width: 42px;
  height: 42px;
  margin-bottom: 8px;
  min-height: 42px;
  border-radius: 5px;
  object-fit: contain;
}
.team_item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.team_item {
  width: 160px;
  height: 166px;
}
.team_item :deep(.card_item-footer) {
  margin-top: 16px;
  height: 28px;
}
.main_item-content :deep(.paragraph) {
  margin: 0;
}
/* .main_item-content :deep(.card_item-footer) {
  height: 0;
} */
.team_item-title {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  min-height: 24px;
  position: relative;
}
.team_item-name {
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
  color: rgba(38, 38, 38, 1);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.team_item-hot {
  font-size: 12px;
  line-height: 18px;
  color: rgba(60, 60, 67, 0.6);
}
.team_item-application {
  font-size: 12px;
  line-height: 18px;
  width: 136px;
  padding: 4px 11px;
  /* margin-top: 16px; */
  color: rgba(10, 132, 255, 1);
  background: rgba(0, 122, 255, 0.08);
  border-radius: 7px;
  transition: all 0.4s ease 0s;
  display: flex;
  align-items: center;
  user-select: none;
}
.team_item-application:hover {
  background-color: rgba(0, 122, 255, 0.3);
}
.team_item-application > svg {
  margin-right: 6px;
}
/* ******************************************************* */
.article {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
.article_item-cover {
  width: 200px;
  height: 120px;
  margin-right: 16px;
}
.article_item-cover img {
  width: 200px;
  height: 120px;
  object-fit: cover;
  border-radius: 13px;
}
.article_item-content {
  display: flex;
  flex-flow: nowrap;
  padding: 16px 0;
  flex-direction: column;
  overflow: hidden;
}
.article-divider {
  border-top: solid 1px rgba(0, 10, 32, 0.08);
  width: 734px;
  margin-left: -16px;
}
.article__item-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
}
.title_item-content {
  height: 22px;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.title__item-icon {
  height: 22px;
  width: 22px;
  object-fit: contain;
  border-radius: 50%;
  margin-right: 8px;
  cursor: pointer;
}
.title__item-span {
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
  color: rgba(38, 38, 38, 0.75);
  margin-right: 5px;
}
.title__item-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
  line-height: 22px;
  transition: all 0.3s;
  display: block;
}
.title_item-time {
  font-size: 12px;
  line-height: 18px;
  color: rgba(223, 223, 223, 1);
  flex: 0 0 auto;
  margin-left: 25px;
}
.article__item-content {
  margin: 16px 0 18px;
  height: 40px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  text-align: left;
  color: rgba(60, 60, 67, 0.6);
  cursor: pointer;
}
.article__item-tags {
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
}
.tag_item {
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgba(255, 161, 22, 1);
  background: rgba(255, 161, 22, 0.15);
  height: 24px;
  line-height: 20px;
  padding: 2px 8px;
  border-radius: 12px;
  margin-right: 10px;
  white-space: nowrap;
  max-width: 120px;
  display: flex;
  align-items: center;
}
.tag_item > svg {
  margin-right: 5px;
}
/***************************************************** */
.aside_item-input {
  padding: 0 10px;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 1px 3px, rgba(0, 0, 0, 0.08) 0px 2px 8px;
  display: flex;
  background-color: rgba(255, 255, 255, 1);
  align-items: center;
  width: 256px;
  border-radius: 8px;
  transition: all 0.2s ease 0s;
  user-select: none;
  cursor: pointer;
  color: rgba(191, 191, 191, 1);
}

.aside_item-slide {
  height: 128px;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 1px 3px, rgba(0, 0, 0, 0.08) 0px 2px 8px;
  border-radius: 8px;
}
.aside_item-slide img,
.aside_item-active img {
  width: 256px;
  height: 128px;
  object-fit: cover;
  border-radius: 8px;
}
.aside_item-action {
  height: 68px;
}

.aside_item-action :deep(.card_item-footer) {
  display: none;
}
.aside_item-action :deep(.card_item-body) {
  display: none;
}
.action_item {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
.action_item:hover {
  color: transparent;
}
.action_item:first-child {
  color: rgba(10, 132, 255, 0.8);
}

.action_item:last-child {
  color: rgba(255, 161, 22, 0.8);
}
.action_item svg {
  font-size: 36px;
  border-radius: 50%;
  margin-right: 5px;
  padding: 8px;
}
.action_item-icon1 {
  background-color: rgba(10, 132, 255, 0.8);
}
.action_item-icon2 {
  background-color: rgba(255, 161, 22, 0.8);
}
/* *************************************** */
.aside_item-article-hot :deep(.paragraph) {
  margin: 10px 0 0 0;
}
.aside_item-article-hot :deep(.card_item-footer) {
  display: none;
}
.article-hot-title {
  font-size: 14px;
  color: rgba(38, 38, 38, 0.75);
  line-height: 20px;
}
.article-hot-li {
  margin-bottom: 4px;
  display: flex;
  padding: 6px 0px;
  transition: all 0.3s ease 0s;
  /* align-items: center; */
}
.article-hot-li:hover {
  background-color: rgba(247, 247, 248, 1);
}
.li_item-index {
  color: rgba(255, 161, 22, 1);
  color: rgba(60, 60, 67, 0.3);
  font-size: 14px;
  line-height: 20px;
  min-width: 10px;
  font-weight: 700;
  margin-right: 8px;
  font-style: italic;
}
.li_item-content {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  overflow: hidden;
}
.li__item-summary {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12px;
  line-height: 20px;
  height: 20px;
  color: rgba(60, 60, 67, 0.3);
  margin-top: 2px;
  text-indent: 4px;
}
.li__item-paragraph {
  line-height: 22px;
  height: 22px;
  display: flex;
  align-items: center;
}
.li__item-paragraph > :first-child {
  width: 22px;
  height: 22px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 5px;
}
.li__item-paragraph span {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.li__item-paragraph > :last-child {
  width: 14px;
  height: 14px;
  flex: 0 0 auto;
}

.more-loading-btn {
  margin: 20px auto;
  border: none;
  line-height: 20px;
  outline: none;
  user-select: none;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition-property: color, box-shadow, background-color, opacity;
  transition-duration: 0.3s;
  overflow: hidden;
  cursor: pointer;
  opacity: 1;
  font-size: 14px;
  padding: 6px 12px;
  width: 208px;
  border-radius: 5px;
  background: rgba(0, 10, 32, 0.05);
  color: rgba(38, 38, 38, 0.75);
}
.more-loading-btn:hover {
  background-color: rgba(0, 10, 32, 0.1);
}
</style>
