class GeoPoint < ApplicationRecord

  # バリデーション
  validates :name, presence: true
  validates :lonlat, presence: true

end
