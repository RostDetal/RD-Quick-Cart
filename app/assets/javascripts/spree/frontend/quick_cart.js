function SpreeQuickCart() {

  var that = this;

  this.initializeQuickCartForm = function() {
     


    $(".quick-add-to-cart-form").find("form").submit(function() {
      that.order_path = $(this).closest(".quick-add-to-cart-form").find('.order-path').text();
      that.spinner = $(this).closest(".quick-add-to-cart-form").next('.spinner-cart');
      that.submitButton = $(this).find("button");
      that.buttonEnabled(false);

      Spree.ajax({
        url: $(this).attr("action"),
        type: "POST",
        data: $(this).serialize(),

        success: function(data, textStatus, jqXHR) {
          Spree.fetch_cart();
          that.showFlashMessage('Item added to the cart successfully.', true);
        },
        error: function(data, textStatus, jqXHR) {
          that.showFlashMessage('There was a problem adding the item to the cart. Please reload the page and try again.', false);
        },
        complete: function() {
          that.buttonEnabled(true);
        }
      });
      return false;
    });
  };

  this.showFlashMessage = function(message, success) {
    var messageClass;
    if (success == true){
      messageClass = 'success'
    } else {
      messageClass = 'error' 
    };
      
    $('#default').prepend("<div class='flash " + messageClass + "'>" + message + "</div>");
    
    timeoutID = window.setTimeout(function(){
      $('#default').find(".flash.success").remove();
    }, 3000);
  };

  this.replaceCartInformation = function() {
    Spree.ajax({
      url: Spree.routes.cart_link,
      type: "GET",
      cache: false,
      dataType: 'json',
      success: function(data, textStatus, jqXHR) {
        total = data.display_total;
        items_count = data.total_quantity;
        $('#link-to-cart .cart-info').html("Cart: (" + items_count + ") <span class='amount'>" + total + "</span>")
        that.showFlashMessage('Item added to the cart successfully.', true);
      },
      error: function(data, textStatus, jqXHR) {
        that.showFlashMessage('There was a problem adding the item to the cart. Please reload the page and try again.', false);
        //location.reload();
      }
    });
  };

  this.buttonEnabled = function(enabled) {
    if (enabled == false){
      that.submitButton.attr("disabled", "disabled");
      that.spinner.fadeToggle('fast');
      // that.submitButton.text("...");
    } else {
      that.submitButton.removeAttr("disabled");
      that.submitButton.text("");
      that.spinner.fadeToggle('fast');
    }
  };

}

$(document).ready(function() {
  var quickCart = new SpreeQuickCart();
  quickCart.initializeQuickCartForm();
});
