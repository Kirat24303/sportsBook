document.addEventListener("DOMContentLoaded", () => {
    // For demo purposes, set the end time to be 90 minutes from now
    // In a real application, you would get this from your booking system
    const now = new Date()
    const endTime = new Date(now.getTime() + 90 * 60000) // 90 minutes from now
  
    // Update booking information
    // In a real application, you would get this from your database or API
    document.getElementById("venue").textContent = "Basketball Court"
    document.getElementById("booking-date").textContent = formatDate(now)
    document.getElementById("time-slot").textContent = `${formatTime(now)} - ${formatTime(endTime)}`
  
    // Start the countdown timer
    updateCountdown(endTime)
    setInterval(() => updateCountdown(endTime), 1000)
  })
  
  function updateCountdown(endTime) {
    const now = new Date()
    const timeDiff = endTime - now
  
    if (timeDiff <= 0) {
      // Time's up
      document.getElementById("hours").textContent = "00"
      document.getElementById("minutes").textContent = "00"
      document.getElementById("seconds").textContent = "00"
  
      // Add expired class to change the appearance
      document.getElementById("countdown-timer").classList.add("expired")
      return
    }
  
    // Calculate hours, minutes, and seconds
    const hours = Math.floor(timeDiff / (1000 * 60 * 60))
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)
  
    // Update the display
    document.getElementById("hours").textContent = padZero(hours)
    document.getElementById("minutes").textContent = padZero(minutes)
    document.getElementById("seconds").textContent = padZero(seconds)
  
    // Add warning class when less than 15 minutes remaining
    if (timeDiff < 15 * 60 * 1000) {
      document.getElementById("countdown-timer").classList.add("warning")
    }
  }
  
  function padZero(num) {
    return num < 10 ? `0${num}` : num
  }
  
  function formatDate(date) {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return date.toLocaleDateString("en-US", options)
  }
  
  function formatTime(date) {
    const options = { hour: "numeric", minute: "2-digit", hour12: true }
    return date.toLocaleTimeString("en-US", options)
  }
  
  