function show_flash_message(msg, klass) {
    var flash = $("#flash");
    $(flash).find("div").html(msg);
    $(flash).removeClass().addClass("row").addClass(klass).fadeIn(700).delay(5000).fadeOut(500);
}

function hide_flash() { $("#flash").hide(); }
function success_message(msg){ show_flash_message(msg, "success"); }
function warning_message(msg){ show_flash_message(msg, "warning"); }
function error_message(msg){ show_flash_message(msg, "error"); }

function show_error_queue(){
    if (ErrorQueue.length > 0) {
        error_message(window.ErrorQueue.join("<br/>"));
    }
}

function get_modules(){
    if (Modules.length == 0) {

        Ember.$.ajax({url :"/<%= RedBase::Engine.dashboard_namespace.to_s %>/modules.json",
                      async: false,
                      dataType: 'json',
                      type: 'GET'})
            .done(function(data) {
                Modules = data.modules;
                return Modules;
            })
            .fail(function(data){
                ErrorQueue.push(_('Can not connect to remote, please try again'));
                return null;
            }).always(function(){
                $("#mainloader").hide();
                $("#content").show();

            });
    }
    $("#mainloader").hide();
    $("#content").show();
}
$(function(){
    $("#flash").on("click", hide_flash);
    show_error_queue();
});