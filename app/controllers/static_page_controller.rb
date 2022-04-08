class StaticPageController < ApplicationController
  def home
    if user_signed_in? && current_user.account_types == 'user'
      @chats = Chat.where(user_id: current_user.id)
    elsif user_signed_in? && current_user.account_types == 'admin'
      @unassigned_chats = Chat.where(staff_id: nil)
      @assigned_chats = Chat.where.not(staff_id: nil)
    end 
  end
end
