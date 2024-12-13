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

                            <VideoPlayer :autoplay="true" :loop="true" :src="'/videos/demo_video_1.mp4'" type="video/mp4" />

                        </div>

                        <div class="p-2 col-md-6 col-sm-12">

                            <h3>Describe Your Topic</h3>

                            <p>Start by giving your article a title. Then, either write a brief description or simply add the keywords you want to focus on.</p>

                        </div>

                    </div>

                </div>

            </div>

            <div class="tab-pane fade" id="generate" role="tabpanel" aria-labelledby="profile-tab">

                <div class="container mt-4">

                    <div class="row align-items-start">

                        <div class="p-2 col-md-6 col-sm-12">

                            <VideoPlayer :autoplay="true" :loop="true" :src="'/videos/demo_video_2.mp4'" type="video/mp4" />

                        </div>

                        <div class="p-2 col-md-6 col-sm-12">

                            <h3>Generate Your Article & Get Your Content</h3>

                            <p>Hit the generate button, sit back, and let Otis work its magic!</p>
                            <p>Your SEO-optimized article is ready to publish. That’s it – you’re done!</p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

</template>