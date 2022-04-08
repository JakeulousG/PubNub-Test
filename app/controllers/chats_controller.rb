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

  private
  def chat_params
    params.require(:chat).permit(:user_id, :chat_title, :chat_tag)
  end
end
