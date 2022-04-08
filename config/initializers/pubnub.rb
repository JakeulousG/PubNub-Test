require 'pubnub'

pubnub = Pubnub.new(
    subscribe_key: Rails.application.credentials.pubnub[:sub_key],
    publish_key: Rails.application.credentials.pubnub[:publish_key],
    uuid: :myUniqueUUID
)