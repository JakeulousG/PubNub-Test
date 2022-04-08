class StaticPageController < ApplicationController
  def home
    if user_signed_in? && current_user.account_types == 'user'
      @chats = Chat.where(user_id: current_user.id)
    end
  end
end
