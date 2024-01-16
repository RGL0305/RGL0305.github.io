document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=41.3888&longitude=2.159&current=temperature_2m,precipitation&timezone=auto";

  function changeBackgroundAnimation(temperature) {
    const body = document.querySelector('body');
 
    if (temperature < 15) {
      body.style.animationName = 'gradientAnimation-cold';
    } else if (temperature >= 20 && temperature < 25) {
      body.style.animationName = 'gradientAnimation-moderate';
    } else {
      body.style.animationName = 'gradientAnimation-hot';
    }
  }

  function getWeatherData() {
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const temperature = data.current.temperature_2m;
        const temperatureElement = document.getElementById("temperature");
        temperatureElement.textContent = `Temperature: ${temperature}°C`;

        changeBackgroundAnimation(temperature);

        const recipes = {
          cold: [
            {
              suggestion: "Chicken Noodle Soup",
              instructions: "1. Boil chicken broth in a pot. Add diced chicken, chopped vegetables, and noodles. Simmer until cooked.",
            },
            {
              suggestion: "Chicken Noodle Soup",
              instructions: "1. Boil chicken broth in a pot. Add diced chicken, chopped vegetables, and noodles. Simmer until cooked.",
            },
            {
              suggestion: "Beef Stew",
              instructions: "1. Brown beef cubes in a pot. Add onions, carrots, potatoes, and beef broth. Simmer until vegetables are tender.",
            },
            {
              suggestion: "Vegetable Lasagna",
              instructions: "1. Layer lasagna sheets with tomato sauce, ricotta cheese, spinach, and sliced vegetables. Bake until bubbly.",
            },
            {
              suggestion: "Tomato Basil Soup",
              instructions: "1. Sauté onions and garlic. Add tomatoes, basil, and broth. Simmer, then blend until smooth. Serve hot.",
            },
            {
              suggestion: "Roasted Butternut Squash Soup",
              instructions: "1. Roast butternut squash. Blend with onions, broth, and spices. Simmer until flavors meld. Garnish and serve.",
            },
          ],
          moderate: [
            {
              suggestion: "Grilled Salmon with Vegetables",
              instructions: "1. Marinate salmon with herbs and lemon. Grill for 5-7 minutes each side. Serve with grilled vegetables.",
            },
            {
              suggestion: "Grilled Lemon Herb Chicken",
              instructions: "1. Marinate chicken in lemon, herbs, and olive oil. Grill until fully cooked. Serve with roasted vegetables.",
            },
            {
              suggestion: "Spaghetti Carbonara",
              instructions: "1. Cook spaghetti. Sauté pancetta, then add to beaten eggs, cheese, and hot pasta. Toss until creamy.",
            },
            {
              suggestion: "Teriyaki Salmon",
              instructions: "1. Marinate salmon in teriyaki sauce. Broil or grill until cooked through. Serve with rice and steamed vegetables.",
            },
            {
              suggestion: "Mushroom Risotto",
              instructions: "1. Sauté mushrooms and onions. Add arborio rice and broth gradually, stirring until creamy and rice is cooked.",
            },
            {
              suggestion: "Beef Tacos",
              instructions: "1. Sauté beef with taco seasoning. Fill tortillas with beef, lettuce, cheese, and toppings of your choice.",
            },
          ],
          warm: [
            {
              suggestion: "Caprese Pasta Salad",
              instructions: "1. Cook pasta, then mix with cherry tomatoes, mozzarella, basil, olive oil, and balsamic glaze.",
            },
            {
              suggestion: "Carponsiono Pasta Salad",
              instructions: "1. Cook pasta, then mix with cherry tomatoes, mozzarella, basil, olive oil, and balsamic glaze.",
            },
            {
              suggestion: "Greek Salad",
              instructions: "1. Toss together tomatoes, cucumbers, olives, onions, feta cheese, and vinaigrette. Serve chilled.",
            },
            {
              suggestion: "Pesto Pasta",
              instructions: "1. Cook pasta, then mix with basil pesto, cherry tomatoes, pine nuts, and grated Parmesan cheese.",
            },
            {
              suggestion: "Caprese Sandwich",
              instructions: "1. Layer sliced tomatoes, fresh mozzarella, basil leaves, and balsamic glaze between bread slices. Grill or toast.",
            },
            {
              suggestion: "Gazpacho",
              instructions: "1. Blend tomatoes, cucumber, bell peppers, onions, garlic, olive oil, and vinegar. Chill before serving.",
            },
            {
              suggestion: "Shrimp Ceviche",
              instructions: "1. Marinate shrimp in lime juice until opaque. Mix with diced tomatoes, onions, cilantro, and serve chilled.",
              
            },
          ],
        };

        let suggestion = "";
        let instructions = "";
        const recipeSuggestion = document.getElementById("recipeSuggestion");

        if (temperature <= 15) {
          const randomIndex = Math.floor(Math.random() * recipes.cold.length);
          suggestion = recipes.cold[randomIndex].suggestion;
          instructions = recipes.cold[randomIndex].instructions;
        } else if (temperature >= 16 && temperature <= 24) {
          const randomIndex = Math.floor(Math.random() * recipes.moderate.length);
          suggestion = recipes.moderate[randomIndex].suggestion;
          instructions = recipes.moderate[randomIndex].instructions;
        } else {
          const randomIndex = Math.floor(Math.random() * recipes.warm.length);
          suggestion = recipes.warm[randomIndex].suggestion;
          instructions = recipes.warm[randomIndex].instructions;
        }

        recipeSuggestion.textContent = `Recommended Recipe: ${suggestion}`;
        const instructionsElement = document.createElement("p");
        instructionsElement.textContent = `Instructions: ${instructions}`;
        recipeSuggestion.appendChild(instructionsElement);

      })
      .catch(error => {
        console.error('There was a problem fetching the weather data:', error);
        const temperatureElement = document.getElementById("temperature");
        temperatureElement.textContent = `Failed to fetch temperature data: ${error.message}`;
      });
  }
  const getRecipeButton = document.getElementById("getRecipe");
  getRecipeButton.addEventListener("click", getWeatherData);
});
