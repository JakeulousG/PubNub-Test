require "test_helper"

class ChatControllerTest < ActionDispatch::IntegrationTest
  test "should get chat_page" do
    get chat_chat_page_url
    assert_response :success
  end
end
