Deface::Override.new(:virtual_path => "spree/shared/content/_products_list",
                     :name => "quick_cart_add_button",
                     :insert_after => "#product-price-block span.price-cost",
                     :partial => "spree/shared/quick_cart_add_button",
                     :disabled => false)

