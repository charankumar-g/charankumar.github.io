<script>
    document.getElementById("scrollArrow").addEventListener("click", function() {
        let target = document.getElementById("projects").offsetTop; // Get target position
        let currentPosition = window.scrollY;
        let distance = target - currentPosition; // Calculate distance to scroll
        let duration = 1000; // Adjust time in milliseconds (1000ms = 1s)
        let increments = distance / (duration / 15); // Smaller increments for smooth scroll

        let scrollInterval = setInterval(function() {
            if (Math.abs(window.scrollY - target) < Math.abs(increments)) {
                clearInterval(scrollInterval); // Stop when close to the target
                window.scrollTo(0, target); // Ensure exact position
            } else {
                window.scrollBy(0, increments);
            }
        }, 15); // Adjust interval time for smooth effect
    });
</script>
