<script setup>

    import IconAndTextVertical from './IconAndTextVertical.vue';
    import VideoPlayer from './VideoPlayer.vue';

    // Tableau avec les données pour chaque itération
    const howToUseData = [
        { iconClass: 'bi bi-star', textContent: 'This is a star icon', iconColor: "#c0392b", textColor: "#8e44ad" },
        { iconClass: 'bi bi-heart', textContent: 'This is a heart icon', iconColor: "#d35400", textColor: "#8e44ad" },
        { iconClass: 'bi bi-lightning', textContent: 'This is a lightning icon', iconColor: "#f39c12" },
    ];

</script>

<template>

    <div class="mt-5">
        
        <h2>How to use Otis AI</h2>

        <div>
            <p>
                Build your first articles, by following the steps below:
            </p>
        </div>

        <!--
        <div class="d-flex flex-row justify-content-evenly flex-wrap">

            <IconAndTextVertical v-for="(item, index) in howToUseData" 
                :key="index"
                :iconClass="item.iconClass"
                :textContent="item.textContent"
                :iconColor="item.iconColor"
                :textColor="item.textColor"
            ></IconAndTextVertical>

        </div>
        -->

        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="describe-tab" data-bs-toggle="tab" data-bs-target="#describe" type="button" role="tab" aria-controls="describe" aria-selected="true">Describe</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#generate" type="button" role="tab" aria-controls="generate" aria-selected="false">Generate</button>
            </li>
        </ul>

        <div class="tab-content" id="myTabContent">

            <div class="tab-pane fade show active" id="describe" role="tabpanel" aria-labelledby="home-tab">

                <div class="container mt-4">

                    <div class="row align-items-start">

                        <div class="p-2 col-md-6 col-sm-12">
                            <h3>Flex item 1</h3>

                            <VideoPlayer :autoplay="true" :loop="true" src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />

                        </div>

                        <div class="p-2 col-md-6 col-sm-12">

                            <h3>Flex item 2</h3>

                            <p>Aenean euismod, lacus ut rhoncus euismod, libero leo tempus nunc, in finibus libero mi vitae ipsum. Sed sapien turpis, sollicitudin vel augue ac, cursus hendrerit tortor. In porttitor risus velit, suscipit sodales ante pulvinar quis. Mauris ultrices metus vel ligula posuere semper. Integer ut eros non tortor mollis ultricies ut et velit. Sed lobortis sollicitudin enim, eget feugiat sem aliquam in. Maecenas lobortis enim id placerat gravida. Aenean volutpat tempor mauris, sit amet tempor dolor semper vel. Nam ac tortor quis massa feugiat condimentum. Maecenas a augue sodales, sollicitudin lorem sed, pellentesque ex. Etiam viverra quis justo ut consequat. Vestibulum rutrum sit amet orci quis vestibulum. Vivamus in blandit nisl. Sed tincidunt neque dui, nec vehicula neque consectetur sit amet. </p>

                            <p>Quisque lacinia malesuada lectus, et dictum leo. Maecenas aliquam risus at egestas consequat. In accumsan, ipsum a fringilla tincidunt, massa eros molestie mi, semper dictum libero sapien quis nisi. Quisque eget tincidunt ex. Nam leo urna, iaculis sit amet laoreet ut, luctus ac urna. Aenean purus dolor, dignissim mollis lectus id, feugiat ullamcorper elit. Etiam id dignissim nibh, nec imperdiet felis. Nullam in mattis augue. In ultrices ipsum purus, at posuere libero sodales eu. Nulla nulla magna, iaculis sed neque eget, placerat auctor lacus. Integer at neque sapien. Sed molestie risus purus, eget semper velit convallis ac. Cras ante quam, maximus vitae eros at, suscipit rhoncus felis. Morbi ultricies dapibus ligula, fermentum suscipit tortor tincidunt sed. </p>

                        </div>

                    </div>

                </div>

            </div>

            <div class="tab-pane fade" id="generate" role="tabpanel" aria-labelledby="profile-tab">Generate content</div>
        </div>

    </div>

</template>