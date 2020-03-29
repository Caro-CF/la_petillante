pageAccueil();


$("#submit").click(function () {
    console.log("click")
    $.ajax({
        url: "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + $("#search").val(),
    }).done(function (data) {

        if (data.drinks != "null") {
            console.log(data.drinks)
            $("#ficheCocktail").empty()
            data.drinks.forEach(drink => {
                console.log("for each")
                li = $('<li></li>').addClass('liFCocktail')
                li.append($('<img src="' + drink.strDrinkThumb + '"/>'))
                li.append($('<h2></h2>').text(drink.strDrink))
                li.append($('<p></p>').text(drink.strInstructions))
                p = $('<p></p>').text('Ingrédients : ')
                li.append(p);
                $("#ficheCocktail").append($(li));



                for (let i = 1; i < drink['strIngredient' + i].length; i++) {
                    console.log("la boucle")
                    console.log(drink['strIngredient' + i])
                    if (drink['strIngredient' + i] != "null") {
                        p.append($('<span></span>').text(drink['strIngredient' + i] + ' '))
                    }
                }
                li.append($('<p></p>').text(drink.strAlcoholic))
            });

        } else {
            $("#ficheCoktail").remove();
            $("#divCocktail").append("<p></p>").text("recherche non valide")
        }
    });

})


$("input:checkbox").click(function () {
    if ($("#alcool").is(':checked')) {
        if ($(".isAlcool").text() != "Alcoholic") {
            ($("#liFCocktail")).addClass('hidden')
        }
   } else if ($("#sansAlcool").is(':checked')) {
        if ($(".isAlcool").text() != "Non alcoholic") {
            ($("#liFCocktail")).attr("class", "hidden")
        }
    } else if ($("#lesDeux").is(':checked')) {
        if ($(".isAlcool").text() != "Optional alcohol") {
            ($("#liFCocktail")).addClass("hidden")
        }
   /* } else if ($("#alcool").not(':checked')) {
        ($(".liFCocktail")).removeClass('hidden')
    }/* else if (!$("#sansAlcool").is(':checked')) {
        ($(".liFCocktail")).removeClass('hidden')
    } else if (!$("#lesDeux").is(':checked')) {
        ($(".liFCocktail")).removeClass('hidden')
    }*/
}
});

function pageAccueil() {
    for (let k = 0; k < 3; k++) {
        console.log(k)
        $.ajax({
            url: "https://www.thecocktaildb.com/api/json/v1/1/random.php"
        }).done(function (data) {
            console.log(data.drinks)
            console.log(data.drinks[0].strDrinkThumb)

            console.log(data)
            liFC = $('<li></li>').attr('id','liFCocktail')

            liFC.append($('<img src="' + data.drinks[0].strDrinkThumb + '"/>'))
            liFC.append($('<h2></h2>').text(data.drinks[0].strDrink))
            liFC.append($('<p></p>').text(data.drinks[0].strInstructions))
            $("#ficheCocktail").append($(liFC))

            pIngr = $('<p></p>').text('Ingrédients : ')
            liFC.append(pIngr);

            pAlc = $('<p></p>').text(data.drinks[0].strAlcoholic)
            pAlc.addClass('isAlcool')
            liFC.append($(pAlc))

            for (let i = 1; i < data.drinks[0]['strIngredient' + i].length; i++) {
                console.log("la boucle")
                console.log(data.drinks[0]['strIngredient' + i])
                pIngr.append($('<span></span>').text(data.drinks[0]['strIngredient' + i] + ', '))
            }
        });

    }

}

