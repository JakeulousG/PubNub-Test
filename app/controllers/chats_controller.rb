class ChatsController < ApplicationController
  def show
  end

  def new
    @chat = Chat.new()
  end

  def create
    @chat = Chat.new(chat_params)
    if @chat.save
      redirect_to root_url
    else
      render 'new'
    end
  end

  def edit
    @chat = Chat.find(params[:id])
    @staffs = User.where(account_types: 2)
  end

  def update
    @chat = Chat.find(params[:id])
    @chat.update(assign_staff_params)
    redirect_to root_url
  end

  private
  def chat_params
    params.require(:chat).permit(:user_id, :chat_title, :chat_tag)
  end
  def assign_staff_params
    params.require(:chat).permit(:staff_id)
  end
end
