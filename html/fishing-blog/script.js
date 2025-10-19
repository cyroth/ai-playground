
const posts = [
    {
        title: "My First Big Catch",
        date: "2025-10-19",
        content: "I went fishing today and caught a huge bass! It was a tough fight, but I finally reeled it in. What a thrill!",
        image: "https://images.pexels.com/photos/219998/pexels-photo-219998.jpeg"
    },
    {
        title: "A Quiet Day on the Lake",
        date: "2025-10-12",
        content: "Sometimes it's not about the catch, but about the peace and quiet of being on the water. Today was one of those days.",
        image: "https://images.pexels.com/photos/3648269/pexels-photo-3648269.jpeg"
    },
    {
        title: "New Lure Works Like a Charm",
        date: "2025-10-05",
        content: "I tried out a new lure today and it worked like a charm. The fish couldn't resist it! I'll definitely be using this one again.",
        image: "https://images.pexels.com/photos/1429416/pexels-photo-1429416.jpeg"
    },
    {
        title: "Fishing with a Buddy",
        date: "2025-09-28",
        content: "There's nothing better than spending a day on the water with a good friend. We didn't catch much, but we had a great time.",
        image: "https://images.pexels.com/photos/7635628/pexels-photo-7635628.jpeg"
    },
    {
        title: "The One That Got Away",
        date: "2025-09-21",
        content: "I hooked a monster today, but it snapped my line and got away. I'll be back for it, though!",
        image: "https://images.pexels.com/photos/220201/pexels-photo-220201.jpeg"
    },
    {
        title: "Early Morning Bites",
        date: "2025-09-14",
        content: "Woke up before the sun to get the best bites. The early bird gets the worm, or in this case, the fish!",
        image: "https://images.pexels.com/photos/1632089/pexels-photo-1632089.jpeg"
    },
    {
        title: "A Lesson in Patience",
        date: "2025-09-07",
        content: "The fish weren't biting today, but that's okay. Fishing is a great way to practice patience and enjoy the outdoors.",
        image: "https://images.pexels.com/photos/2106037/pexels-photo-2106037.jpeg"
    },
    {
        title: "Exploring a New Fishing Spot",
        date: "2025-08-31",
        content: "I found a new fishing spot today and it's a hidden gem. I'll be keeping this one a secret!",
        image: "https://images.pexels.com/photos/2433467/pexels-photo-2433467.jpeg"
    },
    {
        title: "The Perfect Cast",
        date: "2025-08-24",
        content: "There's a certain satisfaction in a perfect cast. Today, I was in the zone and every cast was a thing of beauty.",
        image: "https://images.pexels.com/photos/1089440/pexels-photo-1089440.jpeg"
    },
    {
        title: "Ice Fishing Adventures",
        date: "2025-08-17",
        content: "It's getting cold, but that doesn't mean the fishing has to stop. Ice fishing season is just around the corner!",
        image: "https://images.pexels.com/photos/660282/pexels-photo-660282.jpeg"
    }
];

const postsContainer = document.getElementById("posts-container");

let postsHTML = "";
posts.forEach(post => {
    postsHTML += `
        <div class="col-md-6 mb-4">
            <div class="card">
                <img src="${post.image}" class="card-img-top" alt="${post.title}">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${post.content}</p>
                    <p class="card-text"><small class="text-muted">${post.date}</small></p>
                </div>
            </div>
        </div>
    `;
});

postsContainer.innerHTML = postsHTML;
