class McdonaldsPoint < ApplicationRecord
  self.table_name = 'mcdonalds_points'

  def readonly?
    true
  end
end
