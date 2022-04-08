class CreateChats < ActiveRecord::Migration[6.1]
  def change
    create_table :chats do |t|
      t.string :chat_title
      t.string :chat_tag
      t.integer :user_id
      t.integer :staff_id

      t.timestamps
    end
  end
end
