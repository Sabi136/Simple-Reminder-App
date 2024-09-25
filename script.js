function setReminder() {
    const day = document.getElementById("day").value;
    const time = document.getElementById("time").value;
    const activity = document.getElementById("activity").value;

    if (day && time && activity) {
        const reminderMessage = `Reminder set for ${day} at ${time} to ${activity}.`;
        document.getElementById("reminderMessage").innerHTML = reminderMessage;

        // here we are calculating the time difference between current time and selected time
        const now = new Date();
        const [hours, minutes] = time.split(":");
        const reminderTime = new Date();
        reminderTime.setHours(hours, minutes, 0);

        const timeDifference = reminderTime - now;

        if (timeDifference > 0) {
            setTimeout(() => {
                playChime();
                showToast(`It's time to ${activity}!`);
                displayImage(activity);
            }, timeDifference);
        } else {
            alert("The selected time is in the past. Please choose a future time.");
        }
    } else {
        alert("Please fill in all fields.");
    }
}

function playChime() {
    const audio = new Audio("sound.mp3"); // Add your chime sound file here
    audio.play();
}

function displayImage(activity) {
    const imageElement = document.getElementById("reminderImage");
    let imagePath = '';

    // Define image paths based on the activity
    switch (activity) {
        case 'wake_up':
            imagePath = 'images/wake_up.webp'; // path to your wake-up image
            break;
        case 'gym':
            imagePath = 'images/gym.avif'; // path to your gym image
            break;
        case 'breakfast':
            imagePath = 'images/breakfast.jpg'; // path to your breakfast image
            break;
        case 'meetings':
            imagePath = 'images/meeting.webp'; // path to your meetings image
            break;
        case 'lunch':
            imagePath = 'images/lunch.webp'; // path to your lunch image
            break;
        case 'nap':
            imagePath = 'images/nap.jpeg'; // path to your nap image
            break;
        case 'library':
            imagePath = 'images/library.jpg'; // path to your library image
            break;
        case 'dinner':
            imagePath = 'images/dinner.webp'; // path to your dinner image
            break;
        case 'sleep':
            imagePath = 'images/sleep.jpeg'; // path to your sleep image
            break;
        default:
            imagePath = 'default.avif';
    }

    // Show the image if an image path exists
    if (imagePath) {
        imageElement.src = imagePath;
        imageElement.style.display = 'block'; // show image
    } else {
        imageElement.style.display = 'none'; // hide image if no activity selected
    }
}

function showToast(message) {
    // Create the toast container
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;

    // Append to the body
    document.body.appendChild(toast);

    // Remove the toast after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}