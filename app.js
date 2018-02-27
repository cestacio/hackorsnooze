$(function() {
    let $form = $(".submit-form");
    let $logIn = $(".log-in");
    let $logInForm = $("#log-in-form");
    let $signUp = $(".sign-up");
    let $signUpForm = $("#sign-up-form");
    let $articleList = $(".article-list");
    let $username = $("#username-sign-up");
    let $passwordSignUp = $("#password-sign-up");
    let $name = $("#name-sign-up");

    $form.hide();
    $logInForm.hide();
    $signUpForm.hide();

    // $.ajax({
    //     method: "GET",
    //     url: "https://hack-or-snooze.herokuapp.com/stories"
    // }).then(function(val) {
    //     console.log(val);
    // });

    $(".home-link").on("click", function() {
        $form.hide();
        $("li").show();
    });

    $logIn.on("click", function() {
        $logInForm.toggle();
        $form.hide();
        $signUpForm.hide();
    });

    $logInForm.on("submit", function() {
        let token = localStorage.getItem("token");
        $.ajax({
            method: "POST",
            url: "https://hack-or-snooze.herokuapp.com/auth",
            data: {
                data: {
                    username: "testingagain",
                    password: "secret"
                }
            }
        }).then(function(val){
            localStorage.setItem("token", val.data.token);
            localStorage.setItem("username", val.data.username);
            var username = localStorage.getItem("username");
            $logInForm.get(0)
            .reset();
        }).then(function() { 
            $.ajax({
                method: "GET",
                url: "https://hack-or-snooze.herokuapp.com/users/" + username,
                headers: {
                    Authorization: `Bearer ${token}`
            }
        }).then(function(val) {
            console.log(val.data.username);
        });
        });
    });
    

    $(".sign-up").on("click", function() {
        $signUpForm.toggle();
        $logInForm.hide();
        $form.hide();
    });

    $signUpForm.on("submit", function() {
        $.ajax({
            method: "POST",
            url: "https://hack-or-snooze.herokuapp.com/users",
            data: {
                data: {
                    name: $name.val(),
                    username: $username.val(),
                    password: $passwordSignUp.val()
                }
            }
        }).then(function(val) {
            localStorage.setItem("username", val.data.username);
            localStorage.setItem("name", val.data.name);
            localStorage.getItem("username");
            localStorage.getItem("name");
        });
        $("#sign-up-form")
            .get(0)
            .reset();
    });

    $(".submit-link").on("click", function() {
        $form.toggle();
        $("li").show();
        $logInForm.hide();
        $signUpForm.hide();
    });

    $form.on("submit", function(event) {
        event.preventDefault();

        let title = $("#inputTitle").val();
        let url = $("#inputUrl").val();
        let hostName = $("<a>")
            .prop("href", url)
            .prop("hostname");

        $("ol").append(
            $(
                "<li><span><i class='far fa-star'></i></span><a href=' " +
                url +
                "' target='_blank'> " +
                title +
                " (" +
                hostName +
                ")" +
                "</a></li>"
            )
        );

        $("#inputTitle").val("");
        $("#inputUrl").val("");

        $form.slideUp("slow");
    });

    $("ol").on("click", ".fa-star", function() {
        $(this).toggleClass("far fa-star fas fa-star");
        $(this)
            .closest("li")
            .toggleClass("favorited");
    });

    let $favorites = $(".favorites-link");
    $favorites.data("text-original", $favorites.text());
    $favorites.text($favorites.data("text-swap"));

    $favorites.on("click", function() {
        $form.hide();
        $("li:not(.favorited)").hide();
        let el = $(this);
        if (el.text() === el.data("text-swap")) {
            el.text(el.data("text-original"));
        } else {
            el.data("text-original", el.text());
            el.text(el.data("text-swap"));
            $("li").show();
        }
    });
});