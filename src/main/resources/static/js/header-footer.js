let nav, menuCategory;
let listCategoryHome = [];

$(document).ready(async function () {
    menuCategory = $("#menu-category");

    await loadCategoryForMenu();
    showCategoryMenu();

    nav = $("nav#nav");
    $(".dropdown-toggle").click(function (e) {
        $(this).next().slideToggle();
        e.preventDefault();
    });

    // $('body').on("click", ".dropdown-menu", function (e) {
    //     $(this).parent().is(".show") && e.stopPropagation();
    // });

    if (window.pageYOffset > 0) {
        $("footer#footer #up-to-top").addClass("show_bottom");
    } else {
        $("footer#footer #up-to-top").removeClass("show_bottom");
    }
    $("footer#footer #up-to-top .btn").click(function (e) {
        e.preventDefault();
        $("body,html").animate({ scrollTop: 0 }, 1000, "easeOutExpo");
    });

    if (window.pageYOffset >= 145) {
        $("nav.nav .container>a, nav.nav .container #cart1").addClass("showed");
        nav.addClass("showed");
        nav.addClass("fixed");
    } else {
        $("nav.nav .container>a, nav.nav .container #cart1").removeClass("showed");
        nav.removeClass("showed");
        nav.removeClass("fixed");
    }

    $(document).scroll(function () {
        if (window.pageYOffset > 0) {
            $("footer#footer #up-to-top").addClass("show_bottom");
        } else {
            $("footer#footer #up-to-top").removeClass("show_bottom");
        }

        if (window.pageYOffset >= 145) {
            $("nav.nav .container>a, nav.nav .container #cart1").addClass("showed");
            nav.addClass("showed");
            nav.addClass("fixed");
        } else {
            $("nav.nav .container>a, nav.nav .container #cart1").removeClass("showed");
            nav.removeClass("showed");
            nav.removeClass("fixed");
        }

        if ($(window).width() < 991) {
            $("nav.nav .container>a, nav.nav .container #cart1").removeClass("showed");
            nav.removeClass("fixed");
        }
    })

    var item = $("[data-product]");

    for (var i = 0; i < item.length; i++) {
        $(item[i]).click(function (e) {
            e.preventDefault();
            var offSetTop = $("#" + $(this).attr("data-product")).offset().top - 80;
            $("body,html").animate({ scrollTop: offSetTop });
        });
    }
});

async function loadCategoryForMenu(){
    await categoryFindAll()
        .then(rs => {
            if(rs.status === 200){
                listCategoryHome = rs.data;
            }
        })
        .catch(e => {
            console.log(e);
        })
}

function showCategoryMenu() {
    if(menuCategory){
        let rs = `<li class="col-12  col-lg-2">
                  <ul>
                     <li class="item-title"><a href="#">Chưa có danh mục</a>
                  </li>
                 </ul>
                </li>`;
        if(listCategoryHome && listCategoryHome.length > 0){
            rs = listCategoryHome.map((data, index) => {
                return `<li class="col-12  col-lg-2">
                        <ul>
                             <li class="item-title"><a href="/tim-kiem?c_id=${data.id}">${dataFilter(data.name)}</a>
                             </li>
                       </ul>
                    </li>`;
            }).join("");
        }

        menuCategory.html(rs);
    }
}