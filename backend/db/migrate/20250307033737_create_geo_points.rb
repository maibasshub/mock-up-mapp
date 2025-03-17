class CreateGeoPoints < ActiveRecord::Migration[8.0]
  def change
    create_table :geo_points do |t|
      t.string :name, null: false
      t.st_point :lonlat, geographic: true
      t.text :description
      t.timestamps
    end
  end
end
